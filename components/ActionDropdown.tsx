'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { actionsDropdownItems } from '@/constants';
import { constructDownloadUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Models } from 'node-appwrite';
import { useState } from 'react';

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOPen, setIsModalOpen] = useState(false);
  const [isDropdownOPen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);

  const renderDialogContent = () => {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOPen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOPen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <Image
            src="/assets/icons/dots.svg"
            alt="dots"
            width={34}
            height={34}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction(actionItem);

                if (
                  ['rename', 'share', 'delete', 'details'].includes(
                    actionItem.value
                  )
                ) {
                  setIsModalOpen(true);
                }
              }}
            >
              {actionItem.value === 'download' ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;
