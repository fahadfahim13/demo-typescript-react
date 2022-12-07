export interface PricingPlan {
    identifier: string;
    name: string;
    term_years: string;
    interest_rate: string;
    dealer_fee: string;
    owner_buydown: string;
}

export interface PricingPlanResponseItem extends PricingPlan {
    id: string;
    created_at: string;
    updated_at: string;
}

export interface SelectedPricingPlan extends PricingPlan {
    financing_product_id: string;
    is_default: string;
    program_id: string;
    sponsor_id: string;
    expires_at:string,
    active_at:string,
}

export interface PricingPlanResponse {
    isSuccess: boolean;
    isFailure: boolean;
    responseCode: {
        code: string;
    };
    data: PricingPlanResponseItem[];
}
