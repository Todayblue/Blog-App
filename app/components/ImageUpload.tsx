'use client'

import Image from 'next/image';
import React, { useState } from 'react';

export function ImageUpload() {
  const [file, setFile] = useState<File | undefined>();
  const [fileURL, setFileURL] = useState<string | undefined>();
  // const [filePath, setFilePath] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      
      if (!res.ok) throw new Error(await res.text());

      const dataIn = (await res.json());
      // setFilePath(dataIn.data)
      
      
    } catch (e: any) {
      console.error(e);
    }
  };

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];

    if (uploadedFile) {
      setFile(uploadedFile);
      setFileURL(URL.createObjectURL(uploadedFile));
    }
  };
const filePath = '/public/image/blogCoverImage/scott-webb-fp4y6MkKyc4-unsplash.jpg'
  return (    
    <>
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        onChange={onImageUpload}
      />

      {fileURL && (
        <div>
          <img src={fileURL} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}
      <input type="submit" value="Upload" />
    </form>
    <Image src={filePath} alt='' width={500} height={500}/>
    </>
    
  );
}

