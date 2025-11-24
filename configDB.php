<?php
// Funciona no PC (SQLite) e na InfinityFree (MySQL) automaticamente

if (file_exists(__DIR__ . '/initStore_db')) {
    // === LOCAL: usa o arquivo SQLite do seu PC ===
    $db = new PDO("sqlite:" . __DIR__ . "/initStore_db");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} else {
    // === ONLINE: usa MySQL da InfinityFree ===
    $host   = 'sql100.infinityfree.com';
    $dbname = 'if0_40161533_initstore_db';   // ← TEM que ser esse nome EXATO
    $user   = 'if0_40161533';
    $pass   = 'Iogriago18';

    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
}
?>