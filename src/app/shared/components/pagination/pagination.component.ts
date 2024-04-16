import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit , OnChanges{
 


  // change page
  @Output() pageChange = new EventEmitter<number>();
  // current page
  @Input() page!: number
  //items per page
  @Input() pageSize!: number
  // total items
  @Input() totalItem!: number
  //item page show
  @Input() showItem: 5 | 7 | 9 = 5;


  //total pages
  pageCount: number 

  pages: Array<number>

  selectedPage(page: number){
    this.page = page
    this.pageChange.emit(page);
  }

  nextPage(){
    if(this.page < this.pageCount){
      const pageChange = this.page + 1
      this.page = pageChange
      this.pageChange.emit(pageChange);
    }
  }
  previousPage(){
    if(this.page > 1){
      const pageChange = this.page - 1
      this.page = pageChange
      this.pageChange.emit(pageChange);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['totalItem'] || changes['pageSize']){
      this.pageCount = Math.ceil(this.totalItem / this.pageSize)
      this.handleChangePages(this.page)
    }
    if(changes['page']){
      this.handleChangePages(this.page)
    }
    if(changes['showItem']){
      if(this.showItem < 5){
        this.showItem = 5
      }
    }

  }

  ngOnInit(): void {
    this.pageCount = Math.ceil(this.totalItem / this.pageSize)
    this.handleChangePages(this.page)    
  }

  handleChangePages(currentPage: number): void {
    if(this.pageCount > this.showItem){
      if(currentPage < this.showItem){
        let arrLeft = Array(this.showItem - 1).fill(0).map((page, i) => { return i + 1 })
        this.pages = arrLeft.concat([-1,this.pageCount])
      }
      else if(currentPage > this.pageCount - this.showItem + 1){
        let arrRight = Array(this.showItem - 1).fill(0).map((page, i) => { return this.pageCount - i }).reverse()
        this.pages = [1 , -1].concat(arrRight)
      }
      else{
        let startIndex = currentPage - Math.floor((this.showItem - 2) / 2)
        let arrCenter = Array.from({ length: this.showItem - 2 }, (_, index) => startIndex + index)
        this.pages = [1 , -1].concat(arrCenter).concat([-1 , this.pageCount])
      }
    }else{
      this.pages = Array(this.pageCount).fill(0).map((page, i) => { return i + 1 })
    }
  }

}
