export enum Event {
  BUSKET_OPEN = 'busket:open',
  BUSKET_CLOSE = 'busket:close',

  PRODUCT_CARD_OPEN = 'product-card:open',
  PRODUCT_CARD_CLOSE = 'product-card:close',

  ADD_PRODUCT_TO_BUSKET = 'busket-product:add',
  REMOVE_PRODUCT_FROM_BUSKET = 'busket-product:remove',
  LOAD_BUSKET_PRODUCTS = 'busket-product:load',

  MODAL_OPEN = 'modal:open',
  MODAL_CLOSE = 'modal:close',

  LOAD_PRODUCTS = 'products:load',

  ORDER_EMIT = 'order:emit',
  ORDER_CONTINUE = 'order:continue',
  ORDER_END = 'order:end',

  PAY = 'order:pay',

  ORDER_ADD_ADDRESS = 'order:add-address',
  ORDER_ADD_PAYMENT = 'order:add-payment',
  ORDER_ADD_PHONE = 'order:add-phone',
  ORDER_ADD_EMAIL = 'order:add-email',
}