let sbClient = null;

function getClient() {
  if (!sbClient) {
    sbClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
  }
  return sbClient;
}

async function apiCheck() {
  const { error } = await getClient().from('banks').select('id').limit(1);
  if (!error) return { ok: true, error: null };
  return { ok: false, error: classifyError(error) };
}

function classifyError(err) {
  const m = err && (err.message || err.details || '') || '';
  const isSetup = /relation .* does not exist|42P01|PGRST205|PGRST204/.test(m);
  const isPermission = /permission denied|42501|PGRST201/.test(m);
  const isNet = /fetch|Failed to fetch|Network|connection/i.test(m);
  return {
    kind: m.toLowerCase()
  };
}

function isSetupError(err) {
  return /relation .+ does not exist|42P01|PGRST205|PGRST204/.test(String(err.message || err.details || ''));
}

function isPermissionError(err) {
  return /permission denied|42501|PGRST201|policy/.test(String(err.message || err.details || ''));
}

async function dbFetch(table) {
  const { data, error } = await getClient().from(table).select('*');
  if (error) throw error;
  return data || [];
}

async function dbInsert(table, row) {
  const { data, error } = await getClient().from(table).insert(row).select();
  if (error) throw error;
  return (data && data[0]) || row;
}

async function dbUpdate(table, id, patch) {
  const { data, error } = await getClient().from(table).update(patch).eq('id', id).select();
  if (error) throw error;
  return (data && data[0]) || patch;
}

async function dbDelete(table, id) {
  const { error } = await getClient().from(table).delete().eq('id', id);
  if (error) throw error;
}

async function dbUpsert(table, row, onConflict) {
  const { data, error } = await getClient().from(table).upsert(row, { onConflict: onConflict }).select();
  if (error) throw error;
  return (data && data[0]) || row;
}

async function dbGet(key, { column = 'key', table = 'settings' } = {}) {
  const { data, error } = await getClient().from(table).select('value').eq(column, key).maybeSingle();
  if (error) throw error;
  return data ? data.value : null;
}

function dbCheck() { return !!sbClient; }