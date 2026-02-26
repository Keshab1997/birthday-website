async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        window.location.href = 'admin.html';
    }
    return user;
}

async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
}

async function logout() {
    await supabase.auth.signOut();
    window.location.href = 'admin.html';
}
