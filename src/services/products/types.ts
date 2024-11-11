export type NewProduct = {
  name: string;
  description: string;
  purchase_price: number;
  quantity: number;
  unit_measurement: string;
  company_id: string;
};

export type Product = {
  id: string;
} & NewProduct;

export type UnitMeasurementType = 'KILOGRAM' | 'LITER' | 'UNIT';

export const UnitMeasurement = {
  KILOGRAM: 'KG',
  LITER: 'L',
  UNIT: 'UNIT',
};
