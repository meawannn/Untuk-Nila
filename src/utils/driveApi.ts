export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  webViewLink?: string;
  iconLink?: string;
  size?: string;
}

export const listDriveFiles = async (
  accessToken: string,
  searchQuery: string = ''
): Promise<DriveFileItem[]> => {
  let url = 'https://www.googleapis.com/drive/v3/files?pageSize=20&fields=nextPageToken,files(id,name,mimeType,modifiedTime,webViewLink,iconLink,size)&orderBy=modifiedTime desc';
  
  if (searchQuery.trim()) {
    const safeQ = searchQuery.replace(/'/g, "\\'");
    url += `&q=name contains '${safeQ}' and trashed = false`;
  } else {
    url += '&q=trashed = false';
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || 'Gagal memuat berkas Google Drive');
  }

  const data = await res.json();
  return data.files || [];
};

export const uploadLetterToDrive = async (
  accessToken: string,
  letterText: string,
  fileName: string = 'Surat_Untuk_Nila.txt'
): Promise<{ id: string; name: string; webViewLink?: string }> => {
  const metadata = {
    name: fileName,
    mimeType: 'text/plain',
    description: 'Surat permintaan maaf dan janji tulus untuk Nila Uzlifatul Fikri Sa’adah',
  };

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
    letterText +
    closeDelimiter;

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error?.message || 'Gagal mengunggah surat ke Google Drive');
  }

  return await res.json();
};
