export enum LarekEvents {
    // Backet actions
    BACKET_OPEN = 'backet:open',
    BACKET_CLOSE = 'backet:close',
  
    // Product card actions
    PRODUCT_CARD_SHOW = 'product-card:show',
    PRODUCT_CARD_HIDE = 'product-card:hide',
  
    // Backet product management
    BACKET_PRODUCT_ADD = 'backet-product:add',
    BACKET_PRODUCT_REMOVE = 'backet-product:remove',
    BACKET_PRODUCTS_LOAD = 'backet-product:load',
  
    // Modal actions
    MODAL_SHOW = 'modal:show',
    MODAL_HIDE = 'modal:hide',
  
    // Product loading
    PRODUCTS_LOAD = 'products:load',
  
    // Order process
    ORDER_SUBMIT = 'order:submit',
    ORDER_PROCEED = 'order:proceed',
    ORDER_COMPLETE = 'order:complete',
  
    // Payment
    ORDER_PAYMENT = 'order:payment',
  
    // Order details
    ORDER_SET_ADDRESS = 'order:set-address',
    ORDER_SET_PAYMENT_METHOD = 'order:set-payment-method',
    ORDER_SET_PHONE = 'order:set-phone',
    ORDER_SET_EMAIL = 'order:set-email',
}