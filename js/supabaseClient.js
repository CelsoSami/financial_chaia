let sbClient = null;

function getClient() {
  if (!sbClient) {
    sbClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: true, autoRefreshToken: true }
    });
  }
  return sbClient;
}

async function apiCheck() {
  const { error } = await getClient().from('banks').select('id').limit(1);
  if (!error) return { ok: true, error: null };
  return { ok: false, error: error };
}

function isSetupError(err) {
  return /relation .+ does not exist|42P01|PGRST205|PGRST204/.test(String(err && (err.message || err.details) || ''));
}

function isPermissionError(err) {
  return /permission denied|42501|PGRST201|policy|JWT|invalid api key|401/i.test(String(err && (err.message || err.details) || ''));
}

function isAuthError(err) {
  return /invalid login credentials|email not confirmed|invalid api key|token has expired|auth session missing/i.test(String(err && err.message || ''));
}

function isSchemaError(err) {
  return /could not find the '[\w]+' column|column [\w.]+ does not exist|PGRST204|PGRST205|42703/i.test(String(err && (err.message || err.details) || ''));
}

async function supabaseSignIn(email, password) {
  return getClient().auth.signInWithPassword({ email: email, password: password });
}

async function supabaseSignOut() {
  const { error } = await getClient().auth.signOut();
  return error ? null : true;
}

async function supabaseSession() {
  try {
    const { data } = await getClient().auth.getSession();
    return data && data.session ? data.session : null;
  } catch (e) {
    return null;
  }
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

function dbCheck() { return !!sbClient; }