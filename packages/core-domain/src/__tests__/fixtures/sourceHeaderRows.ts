/**
 * Each header row must match its exchange's export layout byte for byte; do not retype it.
 */
export const SOURCE_HEADER_ROWS = {
  /** kraken_spot.csv */
  "kraken-spot": ["txid", "refid", "time", "type", "subtype", "aclass", "subclass", "asset", "wallet", "amount", "fee", "balance"],
  /** kraken_futures.csv */
  "kraken-futures": ["uid", "dateTime", "account", "type", "symbol", "contract", "change", "new balance", "new average entry price", "trade price", "mark price", "funding rate", "realized pnl", "fee", "realized funding", "collateral", "conversion spread percentage", "liquidation fee", "position uid"],
  /** bitvavo_spot.csv */
  "bitvavo-spot": ["Timezone", "Date", "Time", "Type", "Currency", "Amount", "Quote Currency", "Quote Price", "Received / Paid Currency", "Received / Paid Amount", "Fee currency", "Fee amount", "Status", "Transaction ID", "Address"],
  /** bitunix_spot.csv */
  "bitunix-spot": ["Date (UTC)", "Label", "Outgoing Asset", "Outgoing Amount", "Incoming Asset", "Incoming Amount", "Fee Asset", "Fee Amount", "Trx. ID", "Comment"],
  /** tangem_activacion_xrp.csv */
  "tangem": ["Date", "Type", "Asset", "Amount", "Fee", "Notes"],
  /** bit2me_spot_2025.xlsx */
  "bit2me-spot": ["Tipo de operación", "Cantidad de destino", "Moneda de destino", "Cantidad de origen", "Moneda de origen", "Comisión de la operación", "Moneda de la comisión", "Exchange", "Grupo", "Descripción", "Fecha"],
} as const;
