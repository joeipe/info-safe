import { Component, OnInit } from '@angular/core';
import { IBlob, IBlobRequest } from '../../core/models/blob.model';
import { BlobStorageApiService } from '../../core/http/blob-storage-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'inf-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  files: IBlob[] = [];
  file?: IBlob;
  media: any;
  newUpload: File;
  loading: boolean = false;
  formNew!: FormGroup;
  formUpdate!: FormGroup;

  constructor(
    private blobStorageApiSvc: BlobStorageApiService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    let sources = [
      this.blobStorageApiSvc.listFiles()
    ];

    forkJoin(sources).subscribe(responseList => {
      this.files = responseList[0];

      this.onImageClick(this.files[0]?.name!);

      this.initForm();
    });
  }

  initForm(): void {
    this.formNew = this.formBuilder.nonNullable.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      newFile: [null, [Validators.required]]
    });

    this.formUpdate = this.formBuilder.nonNullable.group({
      title: [this.files[0]?.metaData?.title, [Validators.required]],
      description: [this.files[0]?.metaData?.description, [Validators.required]]
    });
  }

  onImageClick(fileName: string) {
    this.loading = true;
    this.blobStorageApiSvc.downloadFile(fileName).subscribe(result => {
      this.file = result;
      this.media = this.sanitizer.bypassSecurityTrustUrl(this.file.content!);
      this.formUpdate.controls['title'].setValue(this.file.metaData?.title);
      this.formUpdate.controls['description'].setValue(this.file.metaData?.description);
      this.loading = false;
    });
  }

  onDeleteClick(fileName: string) {
    this.loading = true;
    this.blobStorageApiSvc.deleteFile(fileName).subscribe(result => {
      this.ngOnInit();
      this.loading = false;
    });
  }

  onArchiveClick(fileName: string) {
    this.loading = true;
    this.blobStorageApiSvc.archiveFile(fileName).subscribe(result => {
      this.ngOnInit();
      this.loading = false;
    });
  }

  onFileSelected(event: any) {
    this.newUpload = event.target.files[0];
  }

  onSaveClick() {
    this.loading = true;

    const file = this.newUpload;
    const blobRequest: IBlobRequest = {
      fileName: file.name,
      metaData: {
        title: this.formNew.get('title')?.value,
        description: this.formNew.get('description')?.value
      }
    }

    if (file) {
      const formData = new FormData();
      formData.append("blob", file); // 'blob' string should match with Api param name

      this.blobStorageApiSvc.uploadFile(formData).subscribe(() => {
        this.blobStorageApiSvc.updateMetadata(blobRequest).subscribe(() => {
          this.ngOnInit();
          this.loading = false;
        });
      });
    }
  }

  onUpdateClick() {
    this.loading = true;

    const blobRequest: IBlobRequest = {
      fileName: this.file?.name!,
      metaData: {
        title: this.formUpdate.get('title')?.value,
        description: this.formUpdate.get('description')?.value
      }
    }

    this.blobStorageApiSvc.updateMetadata(blobRequest).subscribe(() => {
      this.ngOnInit();
      this.loading = false;
    });
  }

  isVideoItem(contentType: string): boolean {
    return contentType == 'video/mp4';
  }

  get isVideo() {
    return this.file?.contentType == 'video/mp4';
  }

  get title() {
    return this.formNew.get('title');
  }

  get description() {
    return this.formNew.get('description');
  }

  get newFile() {
    return this.formNew.get('newFile');
  }

  get titleUpdate() {
    return this.formUpdate.get('title');
  }

  get descriptionUpdate() {
    return this.formUpdate.get('description');
  }
}
