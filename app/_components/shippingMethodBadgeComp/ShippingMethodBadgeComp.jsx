"use client";

import Badge from "@leafygreen-ui/badge";
import Image from "next/image";

const ShippingMethodBadgeComp = ({ orderDetails }) => {

    return (
        <Badge variant={orderDetails.shippingMethod.color}>
            <Image
                width={14}
                height={14}
                alt={orderDetails.shippingMethod.id}
                src={orderDetails.shippingMethod.iconPath}
                className='me-1'
            ></Image>
            {
                orderDetails.type
                    ? orderDetails.type
                    : orderDetails.shippingMethod.label
            }
        </Badge>

    );
};

export default ShippingMethodBadgeComp;
