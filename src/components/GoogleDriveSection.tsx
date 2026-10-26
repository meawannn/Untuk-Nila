import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  getAccessToken 
} from '../utils/firebaseAuth';
import { 
  listDriveFiles, 
  uploadLetterToDrive, 
  DriveFileItem 
} from '../utils/driveApi';
import { 
  FolderGit2, 
  Search, 
  FileText, 
  ExternalLink, 
  LogOut, 
  CheckCircle, 
  Upload, 
  RefreshCw,
  FolderOpen
} from 'lucide-react';

interface GoogleDriveSectionProps {
  isDark?: boolean;
}

export const GoogleDriveSection: React.FC<GoogleDriveSectionProps> = ({ isDark = false }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [lastUploadedLink, setLastUploadedLink] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        fetchFiles(accessToken, '');
      },
      () => {
        setUser(null);
        setToken(null);
        setFiles([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        fetchFiles(res.accessToken, '');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal login dengan Google';
      setErrorMessage(msg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setFiles([]);
  };

  const fetchFiles = async (accessToken: string, query: string) => {
    setIsLoadingFiles(true);
    setErrorMessage(null);
    try {
      const list = await listDriveFiles(accessToken, query);
      setFiles(list);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal memuat berkas Drive';
      setErrorMessage(msg);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      fetchFiles(token, searchQuery);
    }
  };

  const handleSaveLetterToDrive = async () => {
    if (!token) return;
    setUploadStatus('Menyimpan...');
    setErrorMessage(null);

    const letterContent = `SURAT PERMINTAAN MAAF & JANJI TULUS
Untuk: Nila Uzlifatul Fikri Sa'adah

Nila sayangku, belakangan ini aku mungkin terlihat terlalu fokus sama duniaku yang padat. Jam tidur ku ga teratur, waktu bareng kamu semakin berkurang, sering slow respon, bahkan video call yang udah ga sama lagi. Aku tau kamu ngerasa sepi dan bertanya-tanya "apa aku masih dicintai nya?"

Jawabannya: aku selalu mencintai kamu. Tapi aku sadar bahwa hidup bukan hanya soal cinta. Hidup terus berjalan dan aku berusaha melakukan yang terbaik untuk mengungkapkan rasa cintaku padamu dan bagaimana aku hadir didalam hari-harimu.

Janji untuk Nila:
- Waktu untuk kamu bukan sisa-sisa waktu di ujung hari, tapi waktu yang akan selalu aku usahakan dan jaga khusus.
- Berusaha kasih kabar tanpa harus diminta duluan.
- Weekend ini aku usahain udah ACC judul biar kita bisa bareng-bareng skripsian via WA!
- Menjadikan Nila prioritas utama dan selalu mendengarkan ceritamu dengan penuh cinta.

With Love,
Once Yours
`;

    try {
      const uploaded = await uploadLetterToDrive(token, letterContent, 'Surat_Cinta_Untuk_Nila.txt');
      setUploadStatus('Tersimpan di Google Drive!');
      if (uploaded.webViewLink) {
        setLastUploadedLink(uploaded.webViewLink);
      }
      // Refresh file list
      fetchFiles(token, searchQuery);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal menyimpan ke Drive';
      setErrorMessage(msg);
      setUploadStatus(null);
    }
  };

  return (
    <section className="py-12 px-4 max-w-3xl mx-auto scroll-mt-20" id="google-drive-section">
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-xl backdrop-blur-md transition-all ${
          isDark
            ? 'bg-rose-950/40 border-rose-800/50 text-rose-100 shadow-rose-950/50'
            : 'bg-white/80 border-rose-200/70 text-rose-950 shadow-rose-200/40'
        }`}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-4 border-b border-rose-200/60 dark:border-rose-800/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300">
              <FolderGit2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                Google Drive Skripsi &amp; Surat Cinta
              </h3>
              <p className="text-xs text-rose-700/80 dark:text-rose-300/80">
                Akses berkas skripsi atau simpan surat permintaan maaf ini langsung ke akun Drive kamu
              </p>
            </div>
          </div>

          {user && (
            <div className="flex items-center gap-2">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Akun Google'}
                  className="h-8 w-8 rounded-full border border-rose-300"
                />
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-800/50 transition-colors cursor-pointer"
                title="Keluar dari akun Google"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Keluar</span>
              </button>
            </div>
          )}
        </div>

        {/* Not Logged In: Show Official Google Sign-In Button */}
        {!user ? (
          <div className="text-center py-6">
            <p className="text-sm text-rose-800/90 dark:text-rose-200/90 mb-5 max-w-md mx-auto">
              Hubungkan akun Google kamu untuk mencari berkas skripsi, melihat dokumen, atau mencadangkan surat permintaan maaf ini ke Google Drive.
            </p>

            <button
              onClick={handleSignIn}
              disabled={isLoggingIn}
              className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-700 text-sm font-semibold rounded-full border border-gray-300 shadow-md hover:bg-gray-50 active:scale-98 transition-all cursor-pointer disabled:opacity-50"
            >
              {/* Official Google G Logo SVG */}
              <svg className="h-5 w-5" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              <span>{isLoggingIn ? 'Menghubungkan...' : 'Sign in with Google'}</span>
            </button>
          </div>
        ) : (
          /* Logged In View */
          <div>
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
              {/* Search input */}
              <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Cari berkas (contoh: skripsi)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                    isDark
                      ? 'bg-slate-900 border-rose-900 text-rose-100 placeholder-rose-400/50'
                      : 'bg-rose-50/60 border-rose-200 text-rose-950 placeholder-rose-800/50'
                  }`}
                />
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-rose-400" />
              </form>

              {/* Save letter button */}
              <button
                onClick={handleSaveLetterToDrive}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>{uploadStatus || 'Simpan Surat Ini ke Drive'}</span>
              </button>
            </div>

            {/* Uploaded Confirmation */}
            {lastUploadedLink && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Surat cinta berhasil disimpan di Google Drive kamu!</span>
                </span>
                <a
                  href={lastUploadedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline flex items-center gap-1 hover:text-emerald-900"
                >
                  <span>Buka Berkas</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}

            {/* Error banner if any */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-100 dark:bg-rose-900/60 border border-rose-300 text-rose-900 dark:text-rose-100 text-xs">
                {errorMessage}
              </div>
            )}

            {/* File List */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {isLoadingFiles ? (
                <div className="py-8 text-center text-xs opacity-75 flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Memuat berkas dari Google Drive...</span>
                </div>
              ) : files.length === 0 ? (
                <div className="py-8 text-center text-xs opacity-70">
                  <FolderOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <span>Tidak ada berkas yang ditemukan.</span>
                </div>
              ) : (
                files.map((file) => (
                  <div
                    key={file.id}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      isDark
                        ? 'bg-slate-900/60 border-rose-900/40 hover:bg-slate-900'
                        : 'bg-rose-50/50 border-rose-100 hover:bg-rose-100/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <FileText className="h-4 w-4 text-rose-500 shrink-0" />
                      <span className="truncate font-medium">{file.name}</span>
                    </div>

                    {file.webViewLink && (
                      <a
                        href={file.webViewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 shrink-0 ml-2"
                      >
                        <span>Lihat</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
