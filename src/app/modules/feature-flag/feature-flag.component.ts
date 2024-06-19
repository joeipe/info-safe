import { Component, OnInit } from '@angular/core';
import { IFeature } from '../../core/models/feature.model';
import { FeatureApiService } from '../../core/http/feature-api.service';

@Component({
  selector: 'inf-feature-flag',
  templateUrl: './feature-flag.component.html',
  styleUrl: './feature-flag.component.scss'
})
export class FeatureFlagComponent implements OnInit {
  featureFlag: IFeature;
  loading: boolean = false;

  constructor(
    private featureApiSvc: FeatureApiService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getFeatureTest();
  }

  getFeatureTest() {
    this.featureApiSvc.getFeatureTest().subscribe(result => {
      this.featureFlag = result;
      this.loading = false;
    });
  }
}
