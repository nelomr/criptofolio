import type { TransactionMappedData } from "@criptofolio/shared-types";

export type NormalizerHandler = (
  normalized: TransactionMappedData
) => void;
