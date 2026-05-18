import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Button,
  RadioGroup,
  Radio,
  Switch,
  TextInput,
  Amount,
  Divider,
  Badge,
  IconButton,
  PlusIcon,
  TrashIcon,
  Dropdown,
  DropdownOverlay,
  SelectInput,
  ActionList,
  ActionListItem,
  CalendarIcon,
  LinkIcon,
} from '@razorpay/blade/components';

type Instalment = {
  id: number;
  amount: string;
  dueDate: string;
  description: string;
};

type PaymentMethodModalProps = {
  isOpen: boolean;
  onDismiss: () => void;
};

const TOTAL = 100;

const formatDate = (d: Date) =>
  d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const addDays = (base: Date, days: number) => {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
};

const addMonths = (base: Date, months: number) => {
  const d = new Date(base);
  d.setMonth(d.getMonth() + months);
  return d;
};

const getDueDate = (index: number, period: string): string => {
  const base = new Date();
  if (period === 'weekly') return formatDate(addDays(base, index * 7));
  if (period === 'biweekly') return formatDate(addDays(base, index * 14));
  if (period === 'quarterly') return formatDate(addMonths(base, index * 3));
  return formatDate(addMonths(base, index));
};

const defaultInstalments = (): Instalment[] =>
  [1, 2, 3].map((i) => ({
    id: i,
    amount: '',
    dueDate: getDueDate(i - 1, 'monthly'),
    description: `Instalment ${i}`,
  }));

export const PaymentMethodModal = ({ isOpen, onDismiss }: PaymentMethodModalProps) => {
  const [paymentType, setPaymentType] = useState('full');
  const [splitEnabled, setSplitEnabled] = useState(false);
  const [period, setPeriod] = useState('monthly');
  const [instalments, setInstalments] = useState<Instalment[]>(defaultInstalments);

  const allocated = instalments.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0);
  const remaining = (TOTAL - allocated).toFixed(2);
  const isFullyAllocated = parseFloat(remaining) === 0;

  const applySplit = (list: Instalment[], p = period) => {
    const per = (TOTAL / list.length).toFixed(2);
    return list.map((r, i) => ({ ...r, amount: per, dueDate: getDueDate(i, p) }));
  };

  const handleToggleSplit = (checked: boolean) => {
    setSplitEnabled(checked);
    if (checked) setInstalments((prev) => applySplit(prev));
  };

  const handlePeriodChange = (p: string) => {
    setPeriod(p);
    if (splitEnabled) setInstalments((prev) => applySplit(prev, p));
  };

  const addInstalment = () => {
    const newRow: Instalment = {
      id: Date.now(),
      amount: '',
      dueDate: getDueDate(instalments.length, period),
      description: `Instalment ${instalments.length + 1}`,
    };
    const next = [...instalments, newRow];
    setInstalments(splitEnabled ? applySplit(next) : next);
  };

  const removeInstalment = (id: number) => {
    const next = instalments.filter((r) => r.id !== id);
    setInstalments(splitEnabled ? applySplit(next) : next);
  };

  const updateInstalment = (id: number, field: keyof Instalment, value: string) => {
    setInstalments((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const today = formatDate(new Date());

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} size="medium">
      <ModalHeader
        title="Payment Method"
        subtitle="Choose how you'd like your customers to pay this link."
      />

      <ModalBody>
        {/* ── Payment type selector ── */}
        <RadioGroup
          label=""
          name="paymentType"
          value={paymentType}
          onChange={({ value }) => setPaymentType(value)}
        >
          <Box display="flex" gap="spacing.4" marginBottom="spacing.5">
            <Box
              flex="1"
              padding="spacing.4"
              borderWidth="thin"
              borderColor={paymentType === 'full' ? 'surface.border.primary.normal' : 'surface.border.gray.normal'}
              borderRadius="medium"
              backgroundColor={paymentType === 'full' ? 'surface.background.primary.subtle' : 'surface.background.gray.subtle'}
            >
              <Radio value="full">Full Payment</Radio>
              <Text size="small" color="surface.text.gray.muted" marginTop="spacing.1">
                Collect the entire amount at once
              </Text>
            </Box>

            <Box
              flex="1"
              padding="spacing.4"
              borderWidth="thin"
              borderColor={paymentType === 'partial' ? 'surface.border.primary.normal' : 'surface.border.gray.normal'}
              borderRadius="medium"
              backgroundColor={paymentType === 'partial' ? 'surface.background.primary.subtle' : 'surface.background.gray.subtle'}
            >
              <Radio value="partial">Partial Payment</Radio>
              <Text size="small" color="surface.text.gray.muted" marginTop="spacing.1">
                Split into multiple instalments
              </Text>
            </Box>
          </Box>
        </RadioGroup>

        <Divider marginBottom="spacing.5" />

        {/* ── Full Payment ── */}
        {paymentType === 'full' && (
          <Box>
            <Box
              backgroundColor="surface.background.primary.subtle"
              borderRadius="large"
              padding="spacing.6"
              textAlign="center"
              marginBottom="spacing.5"
              borderWidth="thin"
              borderColor="surface.border.primary.normal"
            >
              <Text size="small" color="surface.text.primary.normal" weight="semibold" marginBottom="spacing.2">
                AMOUNT DUE
              </Text>
              <Amount value={100} type="heading" size="2xlarge" weight="semibold" />
              <Box display="flex" alignItems="center" justifyContent="center" gap="spacing.3" marginTop="spacing.4">
                <Text size="small" color="surface.text.gray.subtle">Due on</Text>
                <Box
                  display="flex"
                  alignItems="center"
                  gap="spacing.2"
                  backgroundColor="surface.background.gray.intense"
                  borderRadius="small"
                  paddingX="spacing.3"
                  paddingY="spacing.2"
                  borderWidth="thin"
                  borderColor="surface.border.primary.normal"
                >
                  <CalendarIcon size="small" color="interactive.icon.primary.normal" />
                  <Badge color="primary" size="small">TODAY</Badge>
                  <Text size="small" color="surface.text.primary.normal" weight="semibold">{today}</Text>
                </Box>
              </Box>
            </Box>

            <Box
              backgroundColor="surface.background.gray.subtle"
              borderRadius="medium"
              padding="spacing.4"
              borderWidth="thin"
              borderColor="surface.border.gray.normal"
            >
              {[
                { label: 'Payment Link ID', value: 'plink_SomdcCqHNUMiCf' },
                { label: 'Created', value: '13 May 2026, 02:01:56 pm' },
                { label: 'Reference ID', value: '12345' },
                { label: 'Payment type', value: 'Full Payment', highlight: true },
              ].map((row, i, arr) => (
                <Box key={row.label}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" paddingY="spacing.3">
                    <Text size="small" color="surface.text.gray.muted">{row.label}</Text>
                    <Text size="small" weight="semibold" color={row.highlight ? 'surface.text.primary.normal' : 'surface.text.gray.normal'}>
                      {row.value}
                    </Text>
                  </Box>
                  {i < arr.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* ── Partial Payment ── */}
        {paymentType === 'partial' && (
          <Box>
            {/* Total + remaining */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              backgroundColor="surface.background.primary.subtle"
              borderRadius="medium"
              padding="spacing.4"
              borderWidth="thin"
              borderColor="surface.border.primary.normal"
              marginBottom="spacing.4"
            >
              <Box>
                <Text size="small" color="surface.text.primary.normal" weight="semibold">Total Amount</Text>
                <Amount value={100} type="heading" size="large" weight="semibold" />
              </Box>
              <Box textAlign="right">
                <Text
                  size="small"
                  weight="semibold"
                  color={isFullyAllocated ? 'feedback.text.positive.intense' : 'feedback.text.negative.intense'}
                >
                  {isFullyAllocated ? '✓ Fully allocated' : `₹${remaining} remaining`}
                </Text>
                <Text size="xsmall" color="surface.text.gray.muted">to allocate</Text>
              </Box>
            </Box>

            {/* Split toggle */}
            <Box
              display="flex"
              alignItems="center"
              gap="spacing.4"
              backgroundColor="surface.background.gray.subtle"
              borderRadius="medium"
              padding="spacing.4"
              borderWidth="thin"
              borderColor="surface.border.gray.normal"
              marginBottom="spacing.4"
            >
              <Switch
                accessibilityLabel="Split amount equally"
                isChecked={splitEnabled}
                onChange={({ isChecked }) => handleToggleSplit(isChecked)}
              />
              <Box flex="1">
                <Text size="small" weight="semibold">Split amount equally</Text>
                <Text size="xsmall" color="surface.text.gray.muted">
                  Auto-divide ₹100 across instalments
                </Text>
              </Box>
              <Dropdown selectionType="single">
                <SelectInput
                  label=""
                  accessibilityLabel="Instalment period"
                  name="period"
                  isDisabled={!splitEnabled}
                  value={period}
                  onChange={({ values }: { values: string[] }) => handlePeriodChange(values[0] ?? 'monthly')}
                />
                <DropdownOverlay>
                  <ActionList>
                    <ActionListItem title="Every week" value="weekly" />
                    <ActionListItem title="Every 2 weeks" value="biweekly" />
                    <ActionListItem title="Every month" value="monthly" />
                    <ActionListItem title="Every quarter" value="quarterly" />
                  </ActionList>
                </DropdownOverlay>
              </Dropdown>
            </Box>

            {/* Instalment rows */}
            <Box
              borderWidth="thin"
              borderColor="surface.border.gray.normal"
              borderRadius="medium"
              overflow="hidden"
              marginBottom="spacing.4"
            >
              {/* Header */}
              <Box
                display="flex"
                backgroundColor="surface.background.gray.moderate"
                paddingX="spacing.4"
                paddingY="spacing.2"
                borderBottomWidth="thin"
                borderBottomColor="surface.border.gray.normal"
              >
                <Box width="36px"><Text size="xsmall" weight="semibold" color="surface.text.gray.muted">#</Text></Box>
                <Box flex="1"><Text size="xsmall" weight="semibold" color="surface.text.gray.muted">AMOUNT (₹)</Text></Box>
                <Box flex="1"><Text size="xsmall" weight="semibold" color="surface.text.gray.muted">DUE DATE</Text></Box>
                <Box flex="1"><Text size="xsmall" weight="semibold" color="surface.text.gray.muted">DESCRIPTION</Text></Box>
                <Box width="32px" />
              </Box>

              {/* Rows */}
              <Box maxHeight="160px" overflowY="auto">
                {instalments.map((row, i) => (
                  <Box
                    key={row.id}
                    display="flex"
                    alignItems="center"
                    gap="spacing.2"
                    paddingX="spacing.4"
                    paddingY="spacing.2"
                    borderBottomWidth={i < instalments.length - 1 ? 'thin' : 'none'}
                    borderBottomColor="surface.border.gray.normal"
                  >
                    <Box width="36px">
                      <Box
                        width="22px"
                        height="22px"
                        borderRadius="round"
                        backgroundColor="surface.background.gray.moderate"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text size="xsmall" weight="semibold" color="surface.text.gray.muted">{i + 1}</Text>
                      </Box>
                    </Box>
                    <Box flex="1">
                      <TextInput
                        label=""
                        accessibilityLabel={`Amount for instalment ${i + 1}`}
                        value={row.amount}
                        isDisabled={splitEnabled}
                        placeholder="0.00"
                        onChange={({ value }) => updateInstalment(row.id, 'amount', value ?? '')}
                      />
                    </Box>
                    <Box flex="1">
                      <TextInput
                        label=""
                        accessibilityLabel={`Due date for instalment ${i + 1}`}
                        value={row.dueDate}
                        placeholder="DD MMM YYYY"
                        onChange={({ value }) => updateInstalment(row.id, 'dueDate', value ?? '')}
                      />
                    </Box>
                    <Box flex="1">
                      <TextInput
                        label=""
                        accessibilityLabel={`Description for instalment ${i + 1}`}
                        value={row.description}
                        placeholder="e.g. First instalment"
                        onChange={({ value }) => updateInstalment(row.id, 'description', value ?? '')}
                      />
                    </Box>
                    <Box width="32px">
                      <IconButton
                        icon={TrashIcon}
                        accessibilityLabel={`Remove instalment ${i + 1}`}
                        size="small"
                        onClick={() => removeInstalment(row.id)}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Button
              variant="tertiary"
              icon={PlusIcon}
              iconPosition="left"
              isFullWidth
              onClick={addInstalment}
            >
              Add Instalment
            </Button>
          </Box>
        )}
      </ModalBody>

      <ModalFooter>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <Box display="flex" alignItems="center" gap="spacing.2">
            <Text size="small" color="surface.text.gray.muted">
              Payment link sent via{' '}
              <Text as="span" size="small" weight="semibold" color="surface.text.gray.normal">SMS & Email</Text>
            </Text>
          </Box>
          <Button variant="primary" icon={LinkIcon} iconPosition="left" onClick={onDismiss}>
            Create a Payment Link
          </Button>
        </Box>
      </ModalFooter>
    </Modal>
  );
};
