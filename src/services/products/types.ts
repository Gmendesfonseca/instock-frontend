export type Product = {
  id: number;
  name: string;
  description: string;
  purchase_price: number;
  sale_price: number;
  quantity: number;
  unit_measurement: UnitMeasurementType;
};

export type UnitMeasurementType = 'KG' | 'L' | 'UNIT';

export const UnitMeasurement = {
  KILOGRAM: 'KG',
  LITER: 'L',
  UNIT: 'UNIT',
};
