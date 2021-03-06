import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../Product/Product.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-distributor-view',
  templateUrl: './distributor-view.component.html',
  styleUrls: ['./distributor-view.component.css'],
  providers: [ProductService]
})
export class DistributorViewComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  private uniqueIdentifier;

  identifier = new FormControl('', Validators.required);
  certificateOfOrigin = new FormControl('', Validators.required);
  batchNumber = new FormControl('', Validators.required);
  lotSize = new FormControl('', Validators.required);
  expirationDate = new FormControl('', Validators.required);
  shipmentDate = new FormControl('', Validators.required);
  trackingNumber = new FormControl('', Validators.required);
  freightTemperature = new FormControl('', Validators.required);
  receivedDate = new FormControl('', Validators.required);
  pickDate = new FormControl('', Validators.required);
  customsTemperature = new FormControl('', Validators.required);
  orderNumber = new FormControl('', Validators.required);
  serialNumber = new FormControl('', Validators.required);
  orderDate = new FormControl('', Validators.required);
  invoiceNumber = new FormControl('', Validators.required);
  retailerTemperature = new FormControl('', Validators.required);
  owner = new FormControl('Temporary Owner');
  issuer = new FormControl('Temporary Issuer');

  constructor(public serviceProduct: ProductService, fb: FormBuilder) {
    this.myForm = fb.group({
      identifier: this.identifier,
      certificateOfOrigin: this.certificateOfOrigin,
      batchNumber: this.batchNumber,
      lotSize: this.lotSize,
      expirationDate: this.expirationDate,
      shipmentDate: this.shipmentDate,
      trackingNumber: this.trackingNumber,
      freightTemperature: this.freightTemperature,
      receivedDate: this.receivedDate,
      pickDate: this.pickDate,
      customsTemperature: this.customsTemperature,
      orderNumber: this.orderNumber,
      serialNumber: this.serialNumber,
      orderDate: this.orderDate,
      invoiceNumber: this.invoiceNumber,
      retailerTemperature: this.retailerTemperature,
      owner: this.owner,
      issuer: this.issuer
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceProduct.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }



  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.hyperledger_composer.scms.Product',
      'certificateOfOrigin': this.certificateOfOrigin.value,
      'batchNumber': this.batchNumber.value,
      'lotSize': this.lotSize.value,
      'expirationDate': this.expirationDate.value,
      'shipmentDate': this.shipmentDate.value,
      'trackingNumber': this.trackingNumber.value,
      'freightTemperature': this.freightTemperature.value,
      'receivedDate': this.receivedDate.value,
      'pickDate': this.pickDate.value,
      'customsTemperature': this.customsTemperature.value,
      'orderNumber': this.orderNumber.value,
      'serialNumber': this.serialNumber.value,
      'orderDate': this.orderDate.value,
      'invoiceNumber': this.invoiceNumber.value,
      'retailerTemperature': this.retailerTemperature.value,
      'owner': this.owner.value,
      'issuer': this.issuer.value
    };

    return this.serviceProduct.updateAsset(form.get('identifier').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceProduct.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'identifier': null,
        'certificateOfOrigin': 'Please enter the certificate of origin',
        'batchNumber': 'Please enter the batch number',
        'lotSize': 'Please enter the lot size',
        'expirationDate': 'Please enter the expirtation date',
        'shipmentDate': 'Please enter the shipment date',
        'trackingNumber': 'Please enter tracking number',
        'freightTemperature': 'Please enter the freight temperature',
        'receivedDate': 'Please enter the received date',
        'pickDate': 'Please enter the pick date',
        'customsTemperature': 'Please enter the customs temperature',
        'orderNumber': 'Please enter the order number',
        'serialNumber': 'Please enter the serial number',
        'orderDate': 'Please enter the order date',
        'invoiceNumber': 'Please enter the shipment date',
        'retailerTemperature': 'Please enter the temperature',
        'owner': this.owner.value,
        'issuer': this.issuer.value
      };

      if (result.identifier) {
        formObject.identifier = result.identifier;
      } else {
        formObject.identifier = null;
      }

      if (result.certificateOfOrigin) {
        formObject.certificateOfOrigin = result.certificateOfOrigin;
      } else {
        formObject.certificateOfOrigin = null;
      }

      if (result.batchNumber) {
        formObject.batchNumber = result.batchNumber;
      } else {
        formObject.batchNumber = null;
      }

      if (result.lotSize) {
        formObject.lotSize = result.lotSize;
      } else {
        formObject.lotSize = null;
      }

      if (result.expirationDate) {
        formObject.expirationDate = result.expirationDate;
      } else {
        formObject.expirationDate = null;
      }

      if (result.shipmentDate) {
        formObject.shipmentDate = result.shipmentDate;
      } else {
        formObject.shipmentDate = null;
      }

      if (result.trackingNumber) {
        formObject.trackingNumber = result.trackingNumber;
      } else {
        formObject.trackingNumber = null;
      }

      if (result.freightTemperature) {
        formObject.freightTemperature = result.freightTemperature;
      } else {
        formObject.freightTemperature = null;
      }

      if (result.receivedDate) {
        formObject.receivedDate = result.receivedDate;
      } else {
        formObject.receivedDate = null;
      }

      if (result.pickDate) {
        formObject.pickDate = result.pickDate;
      } else {
        formObject.pickDate = null;
      }

      if (result.customsTemperature) {
        formObject.customsTemperature = result.customsTemperature;
      } else {
        formObject.customsTemperature = null;
      }

      if (result.orderNumber) {
        formObject.orderNumber = result.orderNumber;
      } else {
        formObject.orderNumber = null;
      }

      if (result.serialNumber) {
        formObject.serialNumber = result.serialNumber;
      } else {
        formObject.serialNumber = null;
      }

      if (result.orderDate) {
        formObject.orderDate = result.orderDate;
      } else {
        formObject.orderDate = null;
      }

      if (result.invoiceNumber) {
        formObject.invoiceNumber = result.invoiceNumber;
      } else {
        formObject.invoiceNumber = null;
      }

      if (result.retailerTemperature) {
        formObject.retailerTemperature = result.retailerTemperature;
      } else {
        formObject.retailerTemperature = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      if (result.issuer) {
        formObject.issuer = result.issuer;
      } else {
        formObject.issuer = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'identifier': 'Please enter the identifier',
      'certificateOfOrigin': 'Please enter the certificate of origin',
      'batchNumber': 'Please enter the batch number',
      'lotSize': 'Please enter the lot size',
      'expirationDate': 'Please enter the expirtation date',
      'shipmentDate': 'Please enter the shipment date',
      'trackingNumber': 'Please enter tracking number',
      'freightTemperature': 'Please enter the freight temperature',
      'receivedDate': 'Please enter the received date',
      'pickDate': 'Please enter the pick date',
      'customsTemperature': 'Please enter the customs temperature',
      'orderNumber': 'Please enter the order number',
      'serialNumber': 'Please enter the serial number',
      'orderDate': 'Please enter the order date',
      'invoiceNumber': 'Please enter the shipment date',
      'retailerTemperature': 'Please enter the temperature',
      'owner': this.owner.value,
      'issuer': this.issuer.value
      });
  }

}
