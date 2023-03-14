import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { IAssetCategory } from '../../service/models/assetCategory.model';
import { MasterService } from './master.service';

@Injectable({ providedIn: 'root' })
export class assetCategoryService extends MasterService<IAssetCategory>{
  constructor(http: HttpClient, configs: ConfigService) {
    super(http, configs, 'Location');
  }
}
