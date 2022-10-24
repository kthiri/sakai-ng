import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { ClientServiceService } from 'src/app/sevices/client-service.service';
import { Client } from 'src/app/classes/client';
import { ClientInterface } from 'src/app/classes/client-interface';
import { CountryService } from 'src/app/demo/service/country.service';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {
    selectedCountryAdvanced: any[] = [];


    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Client[] = [];

    product: ClientInterface = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    countries: any[] = [];
    selectedMulti: any[] = [];
    filteredCountries: any[] = [];

    constructor(private countryService: CountryService,private productService: ProductService, private clientService:ClientServiceService, private messageService: MessageService) { }

    ngOnInit() {
        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });
        this.clientService.getClients().subscribe(data => this.products = data);

        this.cols = [
            {field:'id', header:"ID"},
            { field: 'nom', header: 'Name' },
            { field: 'email', header: 'Email' },
            { field: 'cin', header: 'CIN' },
            { field: 'address', header: 'Address' },
            { field: 'country', header: 'Country' }
        ];

        
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: ClientInterface) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: ClientInterface) {
        this.deleteProductDialog = true;
        this.product = { ...product };

    }

    confirmDeleteSelected() {
        /*
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];*/
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.clientService.DeleteClient(this.product.id!).subscribe(res=>{
            console.log("deleted successfully");
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {}; 
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = false;

        this.submitted = true;

        if (this.product.nom?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.clientService.AddClient(this.product).subscribe(data=>{
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
                    console.log("success");
        
                    this.productDialog = false;
                    
        
                })
               
            } else {
                this.clientService.AddClient(this.product).subscribe(data=>{
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Added', life: 3000 });
                    console.log("success");
        
                    this.productDialog = false;
                    
        
                })
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }


        
     /*   this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        */
    }

    findIndexById(id: string): number {
     /*   let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id; */
         return 1;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
   
    }

    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
    
}
