import Link from 'next/link';
import { Models } from 'node-appwrite';
import React from 'react';
import Thumbnail from './Thumbnail';

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link href={file.url} target="_blank" className="file-card">
      {file.name}
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />

        <div className="flex flex-col items-end justify-between">
          ActionsDropdown ...

          <p className="body-1">{}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
