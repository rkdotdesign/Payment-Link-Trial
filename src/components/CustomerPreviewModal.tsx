import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Button,
  Amount,
  TextInput,
  Badge,
} from '@razorpay/blade/components';

type CustomerPreviewModalProps = {
  isOpen: boolean;
  onDismiss: () => void;
};

const paymentMethods = [
  { id: 'upi', label: 'UPI', emoji: '📱' },
  { id: 'card', label: 'Card', emoji: '💳' },
  { id: 'netbanking', label: 'Netbanking', emoji: '🏦' },
  { id: 'wallet', label: 'Wallet', emoji: '👛' },
];

export const CustomerPreviewModal = ({ isOpen, onDismiss }: CustomerPreviewModalProps) => {
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} size="small">
      <ModalHeader
        title="Customer Payment Page"
        subtitle="This is how your customers see the payment link"
        trailing={<Badge color="notice" size="small">Preview</Badge>}
      />

      <ModalBody>
        {/* Brand header */}
        <Box
          backgroundColor="surface.background.gray.moderate"
          borderRadius="large"
          padding="spacing.5"
          marginBottom="spacing.5"
        >
          <Box display="flex" alignItems="center" gap="spacing.3" marginBottom="spacing.4">
            <Box
              width="32px"
              height="32px"
              borderRadius="medium"
              backgroundColor="surface.background.primary.intense"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text size="small" weight="semibold" color="surface.text.staticWhite.normal">R</Text>
            </Box>
            <Text size="medium" weight="semibold">Razorpay Test</Text>
          </Box>
          <Amount value={100} type="heading" size="2xlarge" weight="semibold" />
          <Text size="small" color="surface.text.gray.muted" marginTop="spacing.1">
            Payment for invoice #12345
          </Text>
        </Box>

        {/* Payment methods */}
        <Text size="small" weight="semibold" marginBottom="spacing.3">Choose payment method</Text>
        <Box display="flex" gap="spacing.3" marginBottom="spacing.4" flexWrap="wrap">
          {paymentMethods.map((method) => (
            <Box
              key={method.id}
              padding="spacing.4"
              borderRadius="medium"
              borderWidth="thin"
              borderColor={method.id === 'upi' ? 'surface.border.primary.normal' : 'surface.border.gray.normal'}
              backgroundColor={method.id === 'upi' ? 'surface.background.primary.subtle' : 'surface.background.gray.intense'}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="spacing.2"
              width="80px"
            >
              <Text size="large">{method.emoji}</Text>
              <Text size="xsmall" weight="semibold">{method.label}</Text>
            </Box>
          ))}
        </Box>

        <TextInput
          label="UPI ID"
          placeholder="name@upi"
          name="upi-id"
        />
      </ModalBody>

      <ModalFooter>
        <Box display="flex" flexDirection="column" gap="spacing.3" width="100%">
          <Button variant="primary" isFullWidth onClick={onDismiss}>
            Pay ₹100.00
          </Button>
          <Text size="xsmall" color="surface.text.gray.muted" textAlign="center">
            Secured by{' '}
            <Text as="span" size="xsmall" weight="semibold">Razorpay</Text>
            {' '}· Encrypted payment
          </Text>
        </Box>
      </ModalFooter>
    </Modal>
  );
};
