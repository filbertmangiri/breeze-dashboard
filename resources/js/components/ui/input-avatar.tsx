import type { ChangeEvent, ComponentPropsWithRef } from 'react'
import type { ReactCropperElement } from 'react-cropper'

import { usePage } from '@inertiajs/react'
import { Trash2 } from 'lucide-react'
import Cropper from 'react-cropper'

import { useRef, useState } from 'react'

import { cn } from '@/utils/class'
import { getNameInitial } from '@/utils/name'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import 'cropperjs/dist/cropper.css'

export function AvatarUpload({
  id,
  className,
  current,
  set,
  reset,
  ...props
}: ComponentPropsWithRef<'img'> & {
  current: string | Blob
  set: (blob: Blob) => void
  reset: () => void
}) {
  const { user } = usePage().props.auth

  const [open, setOpen] = useState(false)
  const [imageToCrop, setImageToCrop] = useState<string | ArrayBuffer | null>(null)
  const [preview, setPreview] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const cropperRef = useRef<ReactCropperElement>(null)

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    let files

    if (e.currentTarget) {
      files = e.currentTarget.files
    } else if (e.target) {
      files = e.target.files
    }

    const reader = new FileReader()

    reader.onload = () => {
      setImageToCrop(reader.result)
    }

    if (files && files[0]) {
      reader.readAsDataURL(files[0])

      setOpen(true)
    }
  }

  const cropHandler = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      cropperRef.current.cropper.getCroppedCanvas().toBlob((blob) => {
        if (blob) {
          set(blob)
        }
      })

      setPreview(cropperRef.current?.cropper.getCroppedCanvas().toDataURL())
    }

    setOpen(false)
  }

  return (
    <>
      <div className="flex items-end gap-2">
        <Avatar
          title="Upload profile picture"
          className={cn('size-32 cursor-pointer rounded-lg transition hover:opacity-80', className)}
          onClick={() => inputRef.current?.click()}
          {...props}
        >
          <AvatarImage src={typeof current === 'string' ? current : preview} alt={user.name} />
          <AvatarFallback className="rounded-lg">{getNameInitial(user.name)}</AvatarFallback>
        </Avatar>

        {current instanceof Blob && (
          <Button type="button" size="icon" variant="destructive" onClick={() => reset()}>
            <Trash2 />
          </Button>
        )}
      </div>

      <input
        id={id}
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onClick={(e) => {
          e.currentTarget.value = ''
        }}
        onChange={fileChangeHandler}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-full flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Foto profil</DialogTitle>
            <DialogDescription>Atur foto profil anda agar berbentuk persegi.</DialogDescription>
          </DialogHeader>
          <div className="flex-grow">
            <Cropper
              ref={cropperRef}
              viewMode={2}
              responsive={true}
              src={imageToCrop as string}
              aspectRatio={1}
              background={true}
              draggable
              dragMode="move"
              autoCropArea={1}
              checkOrientation={false}
              guides={false}
              className="h-96 w-full"
            />
          </div>
          <DialogFooter className="flex-shrink-0">
            <DialogClose asChild>
              <Button type="button" onClick={cropHandler}>
                Selesai
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Kembali
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
