import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TreeViewService } from '../../services/support/tree-view.service';
import { BrowserCacheService } from '../../services/browser-cache/browser-cache-service.service';

declare const $: any;

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css'],
  providers: [TreeViewService]
})
export class TreeViewComponent implements OnInit {
  @Output() select: EventEmitter<any> = new EventEmitter();

  private services: any = {
    core: {
      data: this.storage.getComponentTree()
    }
  };

  constructor(private treeService: TreeViewService, private storage: BrowserCacheService) {
  }

  ngOnInit() {
    console.log(this.storage.getComponentTree())
    this.initTree();
    this.treeService.getTree().then((res) => {
      this.services.core.data = res;
      this.storage.saveComponentTree(res);
      this.initTree();
    });
  }

  initTree() {
    $('#jstree').jstree(this.services).on('changed.jstree', (e, data) => {
      this.select.emit(data.node.original);
    }).jstree();
  }

}
