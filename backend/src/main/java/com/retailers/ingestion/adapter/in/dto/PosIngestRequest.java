package com.retailers.ingestion.adapter.in.dto;

import java.time.OffsetDateTime;
import java.util.List;

import com.retailers.ingestion.domain.model.LineItem;

public record PosIngestRequest(
        String storeId,
        String terminalId,
        String transactionType, // e.g., "SALE", "REFUND"
        List<LineItem> items,
        OffsetDateTime timestamp) {
}
