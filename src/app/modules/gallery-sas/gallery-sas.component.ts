import { Component, OnInit } from '@angular/core';
import { IBlob } from '../../core/models/blob.model';
import { BlobStorageApiService } from '../../core/http/blob-storage-api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'inf-gallery-sas',
  templateUrl: './gallery-sas.component.html',
  styleUrl: './gallery-sas.component.scss'
})
export class GallerySasComponent implements OnInit {
  files: IBlob[] = [];
  loading: boolean = false;

  constructor(
    private blobStorageApiSvc: BlobStorageApiService
  ) { }

  ngOnInit(): void {
    let sources = [
      this.blobStorageApiSvc.listFiles()
    ];

    this.loading = true;
    forkJoin(sources).subscribe(responseList => {
      this.files = responseList[0];
      this.loading = false;
    });
  }

  isVideoItem(contentType: string): boolean {
    return contentType == 'video/mp4';
  }
}
