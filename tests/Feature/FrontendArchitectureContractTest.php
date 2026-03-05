<?php

namespace Tests\Feature;

use PHPUnit\Framework\TestCase;

class FrontendArchitectureContractTest extends TestCase
{
    public function test_required_enterprise_frontend_structure_exists(): void
    {
        $required = [
            'src/api/apiService.ts',
            'src/components/alerts/Alert.tsx',
            'src/components/alerts/ConfirmationBox.tsx',
            'src/components/alerts/Toast.tsx',
            'src/components/buttons/Button.tsx',
            'src/components/badges/Badge.tsx',
            'src/components/cards/Card.tsx',
            'src/components/cards/ChatCard.tsx',
            'src/components/tables/Table.tsx',
            'src/components/tables/PaginatedTable.tsx',
            'src/components/loaders/SkeletonLoader.tsx',
            'src/components/loaders/Spinner.tsx',
            'src/components/charts/MetricChart.tsx',
            'src/components/charts/AnimatedChart.tsx',
            'src/components/modals/Modal.tsx',
            'src/components/modals/RolePermissionModal.tsx',
            'src/context/AuthContext.tsx',
            'src/context/AIContext.tsx',
            'src/context/ToastContext.tsx',
            'src/hooks/usePagination.ts',
            'src/hooks/useFetch.ts',
            'src/hooks/useAIQuery.ts',
            'src/pages/Dashboard.tsx',
            'src/pages/Chat.tsx',
            'src/pages/Users.tsx',
            'src/pages/UserProfile.tsx',
            'src/pages/Roles.tsx',
            'src/pages/Permissions.tsx',
            'src/pages/Products.tsx',
            'src/pages/Orders.tsx',
            'src/pages/Documents.tsx',
            'src/pages/Settings.tsx',
            'src/pages/Landing.tsx',
            'src/utils/validators.ts',
            'src/utils/formatters.ts',
            'src/utils/constants.ts',
            'src/types/api.d.ts',
            'src/types/ui.d.ts',
            'src/types/ai.d.ts',
        ];

        foreach ($required as $path) {
            $this->assertFileExists(__DIR__.'/../../'.$path, $path.' is missing');
        }
    }
}
