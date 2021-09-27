import {Component, Input, OnInit} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ModalController} from '@ionic/angular';
import {makeTree} from '../../../utils/tree';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-shared-tree',
  templateUrl: './shared-tree.component.html',
  styleUrls: ['./shared-tree.component.scss'],
})
export class SharedTreeComponent implements OnInit{

  @Input()data: any[];
  @Input()title = '';

  public treeControl = new NestedTreeControl<any>(node => node.children);
  public dataSource = new MatTreeNestedDataSource<any>();
  public hasChild: (_: number, node: any) => boolean;
  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = makeTree(this.data.filter(d => !d.archived)
      .concat({id: 0, name: this.translate.instant('root'), parentId: -1}));
    this.hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
  }
  async close() {
      await this.modalCtrl.dismiss();
  }
  async dismiss(node: any) {
     await this.modalCtrl.dismiss({ node });
  }
}
