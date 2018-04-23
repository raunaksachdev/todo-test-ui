import {Component,ViewEncapsulation } from "@angular/core";
import {GridOptions} from "ag-grid/main";
import {todoservice} from "../todo-service/todoservice";
import {todo} from "../model/todo";
import {HeaderGroupComponent} from "../header-group-component/header-group.component";
import {HeaderComponent} from "../header-component/header.component";
import { Router } from "@angular/router";

@Component({
    selector: 'rich-grid',
    templateUrl: 'rich-grid.component.html',
    providers:[todoservice],
    styleUrls: ['rich-grid.css', 'proficiency-renderer.css'],
    encapsulation: ViewEncapsulation.None
   
})
export class RichGridComponent {

    private gridOptions:GridOptions;
    public showGrid:boolean;
    public rowData:todo[]=[];
    public todoArray:todo[]=[];
    private toDo:todo;
    private columnDefs:any[];
    public toDoList:todo[];
    public rowCount:string;
    private gridApi;
    private gridColumnApi;
   
    public HeaderGroupComponent = HeaderGroupComponent;


    constructor(private service:todoservice,private router:Router) {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{};
        this.createRowData();
        this.createColumnDefs();
        this.showGrid = true;

        this.gridOptions.defaultColDef = {
            headerComponentFramework : <{new():HeaderComponent}>HeaderComponent,
            headerComponentParams : {
                menuIcon: 'fa-bars'
            }
        }
    }

    private createRowData() {
     
      this.service.getTodoList("http://localhost:8585/todo").then(result => { 

        this.rowData = result;
          
    });
  
  }

    private createColumnDefs() {
        this.columnDefs = [
            {
                children: [
                    {
                        headerName: "id", field: "id",
                        checkboxSelection: true,
                        width: 150
                    },
                    {
                        headerName: "name", field: "name", width: 150
                    },
                    {
                        headerName: "status", field: "status", width: 120
                    }
                ]
            }
        ];
    }

    private calculateRowCount() {
        let count = 0;
        if (this.gridOptions.api && this.rowData) {
           console.log(this.rowData);
           for(let todos of this.rowData){
               let status = [todos.status];
               if(status.indexOf('C')!=-1 ){
                   count++;
               }
           }
           console.log("count is"+count);
            var model = this.gridOptions.api.getModel();
            var totalRows = this.rowData.length;
            var processedRows = model.getRowCount();
            this.rowCount = count + ' / ' + totalRows.toLocaleString();

        }
    }

private rowsSelected() {
    return this.gridApi && this.gridApi.getSelectedRows().length > 0;
}

completeTask() {
    const selectRows = this.gridApi.getSelectedRows();
    this.service.updateService('http://localhost:8585/todo',<todo>selectRows[0]);
    window.location.reload();
        
}

deleteTask() {
    const selectRows = this.gridApi.getSelectedRows();
    this.service.deleteService('http://localhost:8585/todo',<todo>selectRows[0]);
    window.location.reload();
        
    
}

    private onModelUpdated() {
        console.log('onModelUpdated');
        this.calculateRowCount();
    }

    public onReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        console.log('onReady');
        this.calculateRowCount();
    }

    private onCellClicked($event) {
        console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    private onCellValueChanged($event) {
        console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
    }

    private onCellDoubleClicked($event) {
        console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    private onCellContextMenu($event) {
        console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    private onCellFocused($event) {
        console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
    }

    private onRowSelected($event) {
        // taking out, as when we 'select all', it prints to much to the console!!
        // console.log('onRowSelected: ' + $event.node.data.name);
    }

    private onSelectionChanged() {
        console.log('selectionChanged');
    }

    private onBeforeFilterChanged() {
        console.log('beforeFilterChanged');
    }

    private onAfterFilterChanged() {
        console.log('afterFilterChanged');
    }

    private onFilterModified() {
        console.log('onFilterModified');
    }

    private onBeforeSortChanged() {
        console.log('onBeforeSortChanged');
    }

    private onAfterSortChanged() {
        console.log('onAfterSortChanged');
    }

    private onVirtualRowRemoved($event) {
        // because this event gets fired LOTS of times, we don't print it to the
        // console. if you want to see it, just uncomment out this line
        // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
    }

    private onRowClicked($event) {
        console.log('onRowClicked: ' + $event.node.data.name);
    }

    public onQuickFilterChanged($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    }

    // here we use one generic event to handle all the column type events.
    // the method just prints the event name
    private onColumnEvent($event) {
        console.log('onColumnEvent: ' + $event);
    }

}


