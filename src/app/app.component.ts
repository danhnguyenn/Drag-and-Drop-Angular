import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  items = [1, 2, 3, 4, 5];
  draggingItem: any;

  onDragStart(event: DragEvent, item: any) {
    console.log('onDragStart');
    this.draggingItem = item;
    const dataTransfer = event.dataTransfer;
    if (dataTransfer) {
      event.dataTransfer.setData('text/plain', item);
      event.dataTransfer.effectAllowed = 'move';
    }

    const target = event.target as HTMLElement;
    target.classList.add('dragging');
  }

  onDragOver(event: DragEvent) {
    console.log('onDragOver');
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  onDrop(event: DragEvent) {
    console.log('onDrop');
    event.preventDefault();
    const index = this.items.indexOf(this.draggingItem);
    console.log('Vị trí của phần tử', index);
    this.items.splice(index, 1);

    console.log(this.items);

    const dropZone = event.target as HTMLElement;

    console.log({ dropZone });
    const dropIndex = Array.from(dropZone.parentNode?.children || []).indexOf(
      dropZone
    );
    console.log({ dropIndex });

    this.items.splice(dropIndex, 0, this.draggingItem);

    console.log('Items sau khi thay đổi', this.items);

    this.draggingItem = null;

    const target = event.target as HTMLElement;
    if (target) {
      console.log('Sau khi remove');
      target?.classList.remove('dragging');
    }
  }
}
