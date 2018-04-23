import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
// ag-grid
import {AgGridModule} from "ag-grid-angular/main";
// application
import {AppComponent} from "./app.component";
import { HttpModule } from '@angular/http';
// rich grid
import {RichGridComponent} from "./rich-grid-example/rich-grid.component";
import {HeaderComponent} from "./header-component/header.component";
import {HeaderGroupComponent} from "./header-group-component/header-group.component";
import {AddTaskComponent} from "./add-task-component/add-task.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AgGridModule.withComponents(
            [
                HeaderComponent,
                HeaderGroupComponent
            ]
        ),
        RouterModule.forRoot([
         {
            path: 'add-task',
            component: AddTaskComponent
         },
         {
            path: '',
            component: RichGridComponent
         },
         {
            path: 'list-task',
            component: RichGridComponent
         }
      ])
    ],
    declarations: [
        AppComponent,
        RichGridComponent,
        HeaderComponent,
        HeaderGroupComponent,
        AddTaskComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
