import { Component, OnInit } from '@angular/core';
import { IBlob } from '../../core/models/blob.model';
import { BlobStorageApiService } from '../../core/http/blob-storage-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'inf-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  files: IBlob[] = [];
  file?: IBlob;
  media: any;
  loading: boolean = false;

  constructor(
    private blobStorageApiSvc: BlobStorageApiService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    let sources = [
      this.blobStorageApiSvc.listFiles()
    ];

    this.loading = true;
    forkJoin(sources).subscribe(responseList => {
      this.files = responseList[0];

      this.onImageClick(this.files[0]?.name!);

      this.loading = false;
    });
  }

  onImageClick(fileName: string) {
    this.loading = true;
    this.blobStorageApiSvc.downloadFile(fileName).subscribe(result => {
      this.file = result;
      this.media = this.sanitizer.bypassSecurityTrustUrl(this.file.content!);
      this.loading = false;
    });
  }

  isVideoItem(contentType: string): boolean {
    return contentType == 'video/mp4';
  }

  get isVideo() {
    return this.file?.contentType == 'video/mp4';
  }
}
