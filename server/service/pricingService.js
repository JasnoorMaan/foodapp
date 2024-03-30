function calculateDeliveryPrice(request) {
  const { zone, organization_id, total_distance, item_type } = request;

  let basePrice = 100;
  const distanceSurcharge =
    (total_distance - 5) * (item_type === "perishable" ? 10 : 15);
  const totalPrice = basePrice + distanceSurcharge;

  return totalPrice;
}

module.exports = { calculateDeliveryPrice };
