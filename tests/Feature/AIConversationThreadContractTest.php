<?php

namespace Tests\Feature;

use PHPUnit\Framework\TestCase;

class AIConversationThreadContractTest extends TestCase
{
    public function test_all_required_conversation_threads_are_registered(): void
    {
        $config = file_get_contents(__DIR__.'/../../config/ai_threads.php');

        $this->assertNotFalse($config);

        foreach ([
            'conv_users_analysis',
            'conv_products_analysis',
            'conv_sales_analysis',
            'conv_user_orders',
            'conv_business_queries',
            'conv_ai_discussion',
            'conv_dev_help',
            'conv_general_chat',
        ] as $thread) {
            $this->assertStringContainsString($thread, $config);
        }
    }

    public function test_parser_exposes_supported_conversations_and_examples(): void
    {
        $parser = file_get_contents(__DIR__.'/../../app/Services/Query/AIQueryParser.php');

        $this->assertNotFalse($parser);
        $this->assertStringContainsString("'supported_conversations'", $parser);
        $this->assertStringContainsString("'conv_users_analysis'", $parser);
        $this->assertStringContainsString("'conv_general_chat'", $parser);
    }
}
