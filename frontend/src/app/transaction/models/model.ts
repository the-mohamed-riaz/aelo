export interface $pretty_recent_trans {
    icon: string,
    comment: string,
    timeStamp: string,
    amount: string
}

export interface $recentTransaction {
    id: string;
    amount: string;
    comment: string | null;
    type_of_trans: string;
    cat_of_trans: string;
    trans_date: string;
    trans_hour: string;
    payment_mode: string;
    username: string;
}