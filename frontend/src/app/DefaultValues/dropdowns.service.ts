import { Injectable } from '@angular/core';
import { dropdown_i } from '../models/dd-model'
@Injectable({
  providedIn: 'root'
})
export class DropdownsService {

  constructor() { }

  trans_choice: Array<dropdown_i> = [
    { name: 'Debit /Expense', value: 'debit' },
    { name: 'Credit /Income', value: 'credit' },
  ]

  trans_category: Array<dropdown_i> = [
    { name: 'Family', value: 'family' },
    { name: 'Friends', value: 'friends' },
    {
      name: 'Food', value: 'food', child: [
        { name: 'Healthy', value: 'healthy' },
        { name: 'Indoor', value: 'indoor' },
        { name: 'Outdoor', value: 'outdoor' },
      ]
    },
    { name: 'Outings', value: 'outings' },
    { name: 'Medical', value: 'medical' },
    { name: 'Travel', value: 'travel' },
    {
      name: 'Rent', value: 'rent', child: [
        { name: 'House', value: 'house' },
        { name: 'Other', value: 'other' },
      ]
    },
    {
      name: 'Bills', value: 'bills', child: [
        { name: 'Electric bill', value: 'electric bill' },
        { name: 'Phone bill', value: 'phone bill' },
        { name: 'Water bill', value: 'water bill' },
      ]
    },
    {
      name: 'Maintenance', value: 'maintenance', child: [
        { name: 'Bike', value: 'bike' },
        { name: 'Home', value: 'home' },
        { name: 'Gadgets', value: 'gadgets' },
      ]
    },
    { name: 'Personal', value: 'personal' },
    { name: 'Tax', value: 'tax' },
    { name: 'Investment', value: 'investment' },
    {
      name: 'Shopping', value: 'shopping', child: [
        { name: 'Gadgets', value: 'gadgets' },
        { name: 'Groceries', value: 'groceries' },
        { name: 'Cloths', value: 'cloths' },
        { name: 'Jewellery', value: 'jewellery' },
        { name: 'Appliances', value: 'appliances' },
        { name: 'Tools', value: 'tools' },
        { name: 'Essentials', value: 'essentials' },
        { name: 'Luxury', value: 'luxury' },
      ]
    },
    { name: 'Pets', value: 'pets' },
    { name: 'Games', value: 'games' },
    { name: 'Charity Works', value: 'charity_works' },
    { name: 'Gifts', value: 'gifts' },
  ];

  payment_modes: Array<dropdown_i> = [
    { name: 'Cash', value: 'cash' },
    { name: 'UPI Payment', value: 'upi' },
    { name: 'Bank transfer', value: 'bank_transfer' },
    { name: 'Vouchers', value: 'vouchers' },
    { name: 'Cheque', value: 'cheque' },
    { name: 'Cash Backs', value: 'cash_backs' },
    { name: 'Miscellaneous', value: 'miscellaneous' },
    { name: 'Others', value: 'others' },
  ]
}
