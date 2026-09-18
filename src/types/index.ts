export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  origin: string;
  formats: string[];
  imageUrl: string;
  category: string;
  specifications: Record<string, string>;
}

export interface Enquiry {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  status: 'New' | 'Under Review' | 'Quoted' | 'Approved' | 'Closed';
  date: string;
}

export interface Quotation {
  id: string;
  enquiryId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  validity: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}
