<?php

namespace Tests\Unit;

use App\DTO\AIIntentDTO;
use App\Services\Query\AIQueryParser;
use PHPUnit\Framework\TestCase;

class AIQueryParserTest extends TestCase
{
    public function test_parser_emits_aggregate_intent_for_total_query(): void
    {
        $parser = new AIQueryParser();
        $parsed = $parser->parse(new AIIntentDTO('total orders by status', conversationId: 'conv_1'));

        $this->assertSame('aggregate', $parsed['intent']);
        $this->assertSame('conv_1', $parsed['conversation_id']);
    }
}
