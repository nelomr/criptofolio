/**
 * Sample rows with synthetic identifiers. Each source's column layout and conventions (fee placement,
 * gross vs. net totals, multi-leg rows, mixed conventions) are intentional and asserted by the suites;
 * do not normalize them.
 */
export interface SourceLabelSample {
  readonly label: string;
  readonly count: number;
  readonly row: Readonly<Record<string, string>>;
}

export interface SourceVocabulary {
  readonly source: string;
  readonly market: 'spot' | 'futures';
  readonly typeColumn: string;
  readonly headers: readonly string[];
  readonly labels: readonly SourceLabelSample[];
}

export const SOURCE_VOCABULARIES: readonly SourceVocabulary[] = [
  {
    "source": "kraken_spot.csv",
    "market": "spot",
    "typeColumn": "type",
    "headers": [
      "txid",
      "refid",
      "time",
      "type",
      "subtype",
      "aclass",
      "subclass",
      "asset",
      "wallet",
      "amount",
      "fee",
      "balance"
    ],
    "labels": [
      {
        "label": "deposit",
        "count": 11,
        "row": {
          "txid": "LUGYKG-HNRIG-9FOPNG",
          "refid": "FTIHg3l-XakGUGmwoS5Vqevs7UFG4J",
          "time": "2022-09-16 04:08:58",
          "type": "deposit",
          "subtype": "",
          "aclass": "currency",
          "subclass": "fiat",
          "asset": "EUR",
          "wallet": "spot / main",
          "amount": "50.0000",
          "fee": "0",
          "balance": "50.0000"
        }
      },
      {
        "label": "trade",
        "count": 20,
        "row": {
          "txid": "LIOWHZ-2O7KU-OZKQEH",
          "refid": "TDW8LU-BLO9Z-FIP61R",
          "time": "2022-09-18 17:40:34",
          "type": "trade",
          "subtype": "tradespot",
          "aclass": "currency",
          "subclass": "fiat",
          "asset": "EUR",
          "wallet": "spot / main",
          "amount": "-50.0000",
          "fee": "0",
          "balance": "0.0000"
        }
      },
      {
        "label": "withdrawal",
        "count": 2,
        "row": {
          "txid": "LYFNWX-SQP5H-ZHWHQ5",
          "refid": "FTbHR72-kFFSaFltTthfFr40cMwQ1C",
          "time": "2022-11-10 07:50:07",
          "type": "withdrawal",
          "subtype": "",
          "aclass": "currency",
          "subclass": "crypto",
          "asset": "SOL",
          "wallet": "spot / main",
          "amount": "-0.0060000000",
          "fee": "0.0050000000",
          "balance": "0.0097713000"
        }
      },
      {
        "label": "transfer",
        "count": 1,
        "row": {
          "txid": "LZK7P9-QNEY2-2YFPMV",
          "refid": "FTMmf5X-IoFY42qr7THZUJYLI2KO3z",
          "time": "2023-01-16 07:43:18",
          "type": "transfer",
          "subtype": "spottofutures",
          "aclass": "currency",
          "subclass": "fiat",
          "asset": "EUR",
          "wallet": "spot / main",
          "amount": "-200.0000",
          "fee": "0",
          "balance": "2.5205"
        }
      }
    ]
  },
  {
    "source": "bitvavo_spot.csv",
    "market": "spot",
    "typeColumn": "Type",
    "headers": [
      "Timezone",
      "Date",
      "Time",
      "Type",
      "Currency",
      "Amount",
      "Quote Currency",
      "Quote Price",
      "Received / Paid Currency",
      "Received / Paid Amount",
      "Fee currency",
      "Fee amount",
      "Status",
      "Transaction ID",
      "Address"
    ],
    "labels": [
      {
        "label": "withdrawal",
        "count": 6,
        "row": {
          "Timezone": "Europe/Madrid",
          "Date": "2023-02-07",
          "Time": "02:21:39",
          "Type": "withdrawal",
          "Currency": "XRP",
          "Amount": "-439.55",
          "Quote Currency": "",
          "Quote Price": "",
          "Received / Paid Currency": "",
          "Received / Paid Amount": "",
          "Fee currency": "XRP",
          "Fee amount": "0",
          "Status": "Completed",
          "Transaction ID": "ce10b3e9-ecfc-42f5-a44f-d2400f20c998",
          "Address": "rSYNTHmp4tAoHJSvtivWhj3pemZ2fJoz4V"
        }
      },
      {
        "label": "deposit",
        "count": 23,
        "row": {
          "Timezone": "Europe/Madrid",
          "Date": "2023-02-05",
          "Time": "14:44:54",
          "Type": "deposit",
          "Currency": "EUR",
          "Amount": "500",
          "Quote Currency": "",
          "Quote Price": "",
          "Received / Paid Currency": "",
          "Received / Paid Amount": "",
          "Fee currency": "EUR",
          "Fee amount": "0",
          "Status": "Completed",
          "Transaction ID": "fd66e5c5-4f6f-4173-9844-2fc0c40de39c",
          "Address": "ES23***84"
        }
      },
      {
        "label": "buy",
        "count": 12,
        "row": {
          "Timezone": "Europe/Madrid",
          "Date": "2023-02-05",
          "Time": "08:31:01.408",
          "Type": "buy",
          "Currency": "ETH",
          "Amount": "0.30338",
          "Quote Currency": "EUR",
          "Quote Price": "1645",
          "Received / Paid Currency": "EUR",
          "Received / Paid Amount": "-499.81",
          "Fee currency": "EUR",
          "Fee amount": "0.7499",
          "Status": "Completed",
          "Transaction ID": "ea298d27-eb40-4c25-99df-86d9c21d2df0",
          "Address": ""
        }
      },
      {
        "label": "campaign_new_user_incentive",
        "count": 1,
        "row": {
          "Timezone": "Europe/Madrid",
          "Date": "2022-09-30",
          "Time": "02:12:36",
          "Type": "campaign_new_user_incentive",
          "Currency": "EUR",
          "Amount": "10",
          "Quote Currency": "",
          "Quote Price": "",
          "Received / Paid Currency": "",
          "Received / Paid Amount": "",
          "Fee currency": "",
          "Fee amount": "",
          "Status": "Completed",
          "Transaction ID": "43003341-b84e-498d-b7e9-3be0b0239271",
          "Address": ""
        }
      }
    ]
  },
  {
    "source": "bitunix_spot.csv",
    "market": "spot",
    "typeColumn": "Label",
    "headers": [
      "Date (UTC)",
      "Label",
      "Outgoing Asset",
      "Outgoing Amount",
      "Incoming Asset",
      "Incoming Amount",
      "Fee Asset",
      "Fee Amount",
      "Trx. ID",
      "Comment"
    ],
    "labels": [
      {
        "label": "Deposit",
        "count": 2,
        "row": {
          "Date (UTC)": "2022-12-13 04:09:06",
          "Label": "Deposit",
          "Outgoing Asset": "",
          "Outgoing Amount": "0",
          "Incoming Asset": "ADA",
          "Incoming Amount": "4.5",
          "Fee Asset": "",
          "Fee Amount": "0",
          "Trx. ID": "T2760",
          "Comment": "Chain Deposit"
        }
      },
      {
        "label": "Withdraw",
        "count": 1,
        "row": {
          "Date (UTC)": "2022-12-13 14:05:31",
          "Label": "Withdraw",
          "Outgoing Asset": "ADA",
          "Outgoing Amount": "546.844684",
          "Incoming Asset": "",
          "Incoming Amount": "0",
          "Fee Asset": "ADA",
          "Fee Amount": "1",
          "Trx. ID": "T8416",
          "Comment": "On-chain Withdraw"
        }
      }
    ]
  },
  {
    "source": "tangem_activacion_xrp.csv",
    "market": "spot",
    "typeColumn": "Type",
    "headers": [
      "Date",
      "Type",
      "Asset",
      "Amount",
      "Fee",
      "Notes"
    ],
    "labels": [
      {
        "label": "WALLET_ACTIVATION",
        "count": 1,
        "row": {
          "Date": "2022-06-03 02:03:00 UTC",
          "Type": "WALLET_ACTIVATION",
          "Asset": "XRP",
          "Amount": "1.0",
          "Fee": "0.0",
          "Notes": "Tangem Base Reserve"
        }
      }
    ]
  },
  {
    "source": "kraken_futures.csv",
    "market": "futures",
    "typeColumn": "type",
    "headers": [
      "uid",
      "dateTime",
      "account",
      "type",
      "symbol",
      "contract",
      "change",
      "new balance",
      "new average entry price",
      "trade price",
      "mark price",
      "funding rate",
      "realized pnl",
      "fee",
      "realized funding",
      "collateral",
      "conversion spread percentage",
      "liquidation fee",
      "position uid"
    ],
    "labels": [
      {
        "label": "futures trade",
        "count": 598,
        "row": {
          "uid": "4dbd05d8-832a-4739-80c8-137edd784aed",
          "dateTime": "2023-02-08 08:44:52",
          "account": "flex",
          "type": "futures trade",
          "symbol": "usd",
          "contract": "pf_xrpusd",
          "change": "-1.45480000000",
          "new balance": "0.00000000000",
          "new average entry price": "",
          "trade price": "1.42318000000000000000",
          "mark price": "1.42372579167000000000",
          "funding rate": "-0.000028384605269555",
          "realized pnl": "-1.39220000000",
          "fee": "0.06260000000",
          "realized funding": "",
          "collateral": "",
          "conversion spread percentage": "",
          "liquidation fee": "",
          "position uid": ""
        }
      },
      {
        "label": "conversion",
        "count": 314,
        "row": {
          "uid": "cfd31ffd-7752-4926-8231-3a2f63b474cf",
          "dateTime": "2023-02-08 08:44:52",
          "account": "flex",
          "type": "conversion",
          "symbol": "usd",
          "contract": "",
          "change": "1.45480000000",
          "new balance": "1.45480000000",
          "new average entry price": "",
          "trade price": "",
          "mark price": "",
          "funding rate": "",
          "realized pnl": "",
          "fee": "",
          "realized funding": "",
          "collateral": "",
          "conversion spread percentage": "",
          "liquidation fee": "",
          "position uid": ""
        }
      },
      {
        "label": "funding rate change",
        "count": 167,
        "row": {
          "uid": "ef94a7fa-5cd9-47f9-8fcf-dacc7eee574f",
          "dateTime": "2023-02-08 08:02:00",
          "account": "flex",
          "type": "funding rate change",
          "symbol": "usd",
          "contract": "pf_xrpusd",
          "change": "0.00730000000",
          "new balance": "0.00730000000",
          "new average entry price": "",
          "trade price": "",
          "mark price": "",
          "funding rate": "-0.000023022168051861",
          "realized pnl": "",
          "fee": "0.00000000000",
          "realized funding": "0.00730000000",
          "collateral": "",
          "conversion spread percentage": "",
          "liquidation fee": "",
          "position uid": ""
        }
      },
      {
        "label": "futures liquidation",
        "count": 20,
        "row": {
          "uid": "580725d3-8485-459b-a3e4-696d9adce52e",
          "dateTime": "2023-02-02 04:27:35",
          "account": "flex",
          "type": "futures liquidation",
          "symbol": "usd",
          "contract": "pf_suiusd",
          "change": "-7.18240000000",
          "new balance": "0.00000000000",
          "new average entry price": "",
          "trade price": "1.13490000000000000000",
          "mark price": "1.13413695874000000000",
          "funding rate": "-0.000007103617851910",
          "realized pnl": "-6.47820000000",
          "fee": "0.06700000000",
          "realized funding": "",
          "collateral": "",
          "conversion spread percentage": "",
          "liquidation fee": "0.63720000000",
          "position uid": ""
        }
      },
      {
        "label": "cross-exchange transfer",
        "count": 1,
        "row": {
          "uid": "10f400c8-00ea-46f3-97ae-e570e30473b9",
          "dateTime": "2023-01-16 07:43:20",
          "account": "flex",
          "type": "cross-exchange transfer",
          "symbol": "eur",
          "contract": "",
          "change": "200.00000000000",
          "new balance": "200.00000000000",
          "new average entry price": "",
          "trade price": "",
          "mark price": "",
          "funding rate": "",
          "realized pnl": "",
          "fee": "",
          "realized funding": "",
          "collateral": "",
          "conversion spread percentage": "",
          "liquidation fee": "",
          "position uid": ""
        }
      }
    ]
  },
  {
    "source": "bit2me_spot_*.xlsx",
    "market": "spot",
    "typeColumn": "Tipo de operación",
    "headers": [
      "Tipo de operación",
      "Cantidad de destino",
      "Moneda de destino",
      "Cantidad de origen",
      "Moneda de origen",
      "Comisión de la operación",
      "Moneda de la comisión",
      "Exchange",
      "Grupo",
      "Descripción",
      "Fecha"
    ],
    "labels": [
      {
        "label": "Deposit",
        "count": 42,
        "row": {
          "Tipo de operación": "Deposit",
          "Cantidad de destino": "100",
          "Moneda de destino": "EUR",
          "Cantidad de origen": "100",
          "Moneda de origen": "EUR",
          "Comisión de la operación": "0",
          "Moneda de la comisión": "EUR",
          "Exchange": "Bit2Me",
          "Grupo": "bank-transfer",
          "Descripción": "wallet 60cd3049-0b2c-434e-a881-c3aea9feb5ff",
          "Fecha": "2021-12-02 08:28"
        }
      },
      {
        "label": "Trade",
        "count": 118,
        "row": {
          "Tipo de operación": "Trade",
          "Cantidad de destino": "37.636893",
          "Moneda de destino": "XRP",
          "Cantidad de origen": "100",
          "Moneda de origen": "EUR",
          "Comisión de la operación": "0.95",
          "Moneda de la comisión": "EUR",
          "Exchange": "Bit2Me",
          "Grupo": "pocket",
          "Descripción": "wallet e93a08dd-7111-4e62-a794-552b0a3a51ab",
          "Fecha": "2021-12-02 14:39"
        }
      },
      {
        "label": "Staking",
        "count": 499,
        "row": {
          "Tipo de operación": "Staking",
          "Cantidad de destino": "0.0789135",
          "Moneda de destino": "B2M",
          "Cantidad de origen": "",
          "Moneda de origen": "",
          "Comisión de la operación": "0",
          "Moneda de la comisión": "EUR",
          "Exchange": "Bit2Me",
          "Grupo": "earn",
          "Descripción": "earn 7ebbab83-1c51-417f-bc59-41c060a070d9",
          "Fecha": "2021-12-05 03:06"
        }
      },
      {
        "label": "Withdrawal",
        "count": 45,
        "row": {
          "Tipo de operación": "Withdrawal",
          "Cantidad de destino": "1.536429",
          "Moneda de destino": "HBAR",
          "Cantidad de origen": "2.236429",
          "Moneda de origen": "HBAR",
          "Comisión de la operación": "0.210620368",
          "Moneda de la comisión": "EUR",
          "Exchange": "Bit2Me",
          "Grupo": "blockchain",
          "Descripción": "wallet c9708154-5a1c-4130-8e7e-f86914881c3d tx_hash:0.0.995764-1643525659-475580867",
          "Fecha": "2022-01-30 06:54"
        }
      },
      {
        "label": "Swap",
        "count": 1,
        "row": {
          "Tipo de operación": "Swap",
          "Cantidad de destino": "0.0084939",
          "Moneda de destino": "USDC",
          "Cantidad de origen": "0.0084939",
          "Moneda de origen": "USDT",
          "Comisión de la operación": "0",
          "Moneda de la comisión": "EUR",
          "Exchange": "Bit2Me",
          "Grupo": "pocket",
          "Descripción": "wallet 87c4a8eb-652b-45b6-a7d1-4d6ab6ad401c",
          "Fecha": "2022-03-21 01:45"
        }
      },
      {
        "label": "Airdrop",
        "count": 1,
        "row": {
          "Tipo de operación": "Airdrop",
          "Cantidad de destino": "1778.08180605",
          "Moneda de destino": "B2M",
          "Cantidad de origen": "",
          "Moneda de origen": "",
          "Comisión de la operación": "0",
          "Moneda de la comisión": "EUR",
          "Exchange": "Bit2Me",
          "Grupo": "pocket",
          "Descripción": "wallet 35d12521-e623-456c-b86c-b57aa4e0e0c1",
          "Fecha": "2022-04-20 01:03"
        }
      }
    ]
  }
] as const;
