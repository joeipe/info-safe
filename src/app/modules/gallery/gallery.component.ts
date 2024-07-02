import { Component, OnInit } from '@angular/core';
import { IBlob } from '../../core/models/blob.model';
import { BlobStorageApiService } from '../../core/http/blob-storage-api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'inf-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  files: IBlob[] = [];
  file: IBlob;
  thumbnail: any;
  loading: boolean = false;

  constructor(
    private blobStorageApiSvc: BlobStorageApiService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.listFiles();
    this.downloadFile();
  }

  listFiles() {
    this.blobStorageApiSvc.listFiles().subscribe(result => {
      this.files = result;
      this.loading = false;
    });
  }

  downloadFile() {
    this.loading = true;
    this.blobStorageApiSvc.downloadFile('20230825/1.2.276.0.26.1.1.1.2.2023.272.83202.3289086.24903680.jpg').subscribe(result => {
      this.file = result;
      this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(this.file.content!);
      this.loading = false;
    });
  }
}
