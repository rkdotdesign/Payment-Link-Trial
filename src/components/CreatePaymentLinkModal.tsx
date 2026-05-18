import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Button,
  Link,
  IconButton,
  Tabs,
  TabList,
  TabItem,
  TextInput,
  PhoneNumberInput,
  ChipGroup,
  Chip,
  Switch,
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  PlusIcon,
  MobileAppIcon,
  MonitorIcon,
  CrosshairIcon,
  InfoIcon,
} from '@razorpay/blade/components';

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

type PreviewMode = 'mobile' | 'desktop';

// ─── Phone mockup — matches Figma Razorpay checkout preview ──────────────────

const PhoneMockup = () => (
  <div
    style={{
      width: 216,
      height: 339,
      backgroundColor: '#2d55e1',
      borderRadius: 9.6,
      overflow: 'hidden',
      border: '0.6px solid #d8d8d8',
      position: 'relative',
      flexShrink: 0,
    }}
  >
    {/* Blue gradient header */}
    <div
      style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #1a3bbf 0%, #2d55e1 50%, #1e40af 100%)',
      }}
    />

    {/* Top bar — logo + icon */}
    <div style={{ position: 'absolute', top: 14, left: 12, right: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(200,210,255,0.9)', letterSpacing: 1 }}>razorpay</div>
        <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>✓ Razorpay Trusted Business</div>
      </div>
      <div style={{ width: 24, height: 24, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 11, color: 'white' }}>👤</span>
      </div>
    </div>

    {/* Amount */}
    <div style={{ position: 'absolute', top: 72, left: 0, right: 0, textAlign: 'center' }}>
      <div style={{ fontSize: 7, color: 'rgba(220,225,255,0.85)', marginBottom: 4 }}>Total amount to pay</div>
      <div style={{ fontSize: 26, fontWeight: 600, color: 'white', letterSpacing: -0.8 }}>₹4,460</div>
    </div>

    {/* Bottom white sheet */}
    <div
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 178,
        background: 'linear-gradient(180deg, #fafafa 0%, #fff 28%, #fff 72%, #f7f7f8 100%)',
        borderTopLeftRadius: 9.6,
        borderTopRightRadius: 9.6,
        border: '0.6px solid #e4e6e7',
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        overflow: 'hidden',
      }}
    >
      {/* Contact details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: '#0a0a0a', letterSpacing: -0.4 }}>Contact details</div>
        <div style={{ fontSize: 8.4, color: '#7d7d7d' }}>Enter mobile number to continue</div>
      </div>

      {/* Phone input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, height: 29, border: '0.6px solid #e4e6e7', borderRadius: 7, padding: '0 10px', backgroundColor: 'white', boxShadow: '0 1.2px 1.2px rgba(211,211,211,0.15)' }}>
        <span style={{ fontSize: 8, color: '#333' }}>🇮🇳 +91</span>
        <span style={{ fontSize: 8, color: '#9f9f9f' }}>99999 99999</span>
      </div>

      {/* Continue button */}
      <div style={{ height: 29, backgroundColor: '#000', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', boxShadow: '0 1.2px 1.2px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
        <span style={{ fontSize: 8.4, fontWeight: 500, color: 'white' }}>Continue</span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>→</span>
      </div>

      {/* Privacy */}
      <div style={{ textAlign: 'center', fontSize: 7, color: '#9f9f9f', position: 'absolute', bottom: 8, left: 0, right: 0 }}>
        By proceeding, I agree to Razorpay's{' '}
        <span style={{ textDecoration: 'underline' }}>Privacy Notice</span>
      </div>
    </div>
  </div>
);

// ─── Desktop mockup ───────────────────────────────────────────────────────────

const DesktopMockup = () => (
  <div style={{ width: '100%', maxWidth: 280, backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e4e6e7', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
    <div style={{ backgroundColor: '#2d55e1', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(200,210,255,0.9)', letterSpacing: 1 }}>razorpay</div>
      <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.6)' }}>✓ Razorpay Trusted Business</div>
    </div>
    <div style={{ padding: '14px', textAlign: 'center', borderBottom: '1px solid #f0f0f0', backgroundColor: '#1e3fba', color: 'white' }}>
      <div style={{ fontSize: 7, color: 'rgba(220,225,255,0.85)', marginBottom: 4 }}>Total amount to pay</div>
      <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.6 }}>₹4,460</div>
    </div>
    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 500, color: '#0a0a0a' }}>Contact details</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 28, border: '1px solid #e4e6e7', borderRadius: 6, padding: '0 8px', backgroundColor: 'white' }}>
        <span style={{ fontSize: 8, color: '#333' }}>🇮🇳 +91</span>
        <span style={{ fontSize: 8, color: '#9f9f9f', marginLeft: 4 }}>99999 99999</span>
      </div>
      <div style={{ height: 28, backgroundColor: '#000', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', cursor: 'pointer' }}>
        <span style={{ fontSize: 8, fontWeight: 500, color: 'white' }}>Continue</span>
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>→</span>
      </div>
      <div style={{ textAlign: 'center', fontSize: 6.5, color: '#9f9f9f' }}>
        By proceeding, I agree to Razorpay's <span style={{ textDecoration: 'underline' }}>Privacy Notice</span>
      </div>
    </div>
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const CreatePaymentLinkModal = ({ isOpen, onDismiss }: Props) => {
  const showPreview = true;
  const [previewMode, setPreviewMode] = useState<PreviewMode>('mobile');
  const [linkType, setLinkType] = useState('quick');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [upiOnly, setUpiOnly] = useState(false);
  const [notifySms, setNotifySms] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [autoReminders, setAutoReminders] = useState(false);
  const [setExpiry, setSetExpiry] = useState(false);

  const handleCreate = () => { onDismiss(); reset(); };

  const reset = () => {
    
    setPreviewMode('mobile');
    setLinkType('quick');
    setSelectedAmount('');
    setUpiOnly(false);
    setNotifySms(true);
    setNotifyEmail(false);
    setAutoReminders(false);
    setSetExpiry(false);
  };

  const handleDismiss = () => { onDismiss(); reset(); };

  return (
    <Modal isOpen={isOpen} onDismiss={handleDismiss} size="large">
      <ModalHeader title="Create Payment Link" />

      <ModalBody padding="spacing.0">
        <Box display="flex" width="100%" overflow="hidden" height="100%">

          {/* ── Left: Form — scrollable ── */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              paddingTop: 20,
              paddingBottom: 24,
              paddingRight: 20,
              paddingLeft: 20,
            }}
          >

            {/* Quick / Detailed tabs */}
            <Box marginBottom="spacing.6">
              <Tabs
                variant="filled"
                value={linkType}
                onChange={(v) => {
                  setLinkType(v);
                  
                }}
                isFullWidthTabItem
              >
                <TabList>
                  <TabItem value="quick">Quick</TabItem>
                  <TabItem value="detailed">Detailed</TabItem>
                </TabList>
              </Tabs>
            </Box>

            {/* ── Form content ── */}
            <Box display="flex" flexDirection="column" gap="spacing.7">

              {linkType === 'quick' ? (
                /* ── Quick view: amount chips + phone/email input ── */
                <Box display="flex" flexDirection="column" gap="spacing.5">
                  <ChipGroup
                    label="Amount"
                    selectionType="single"
                    name="amount"
                    value={selectedAmount}
                    onChange={({ values }) => setSelectedAmount((values as string[])[0] ?? '')}
                  >
                    <Chip value="100">100</Chip>
                    <Chip value="500">500</Chip>
                    <Chip value="1000">1K</Chip>
                    <Chip value="5000">5K</Chip>
                  </ChipGroup>
                  <TextInput
                    label=""
                    accessibilityLabel="Phone or email"
                    placeholder="Phone or email"
                  />
                </Box>
              ) : (
                /* ── Detailed view — matches Figma node 682:34961 ── */
                <>
                  {/* Payment requested for */}
                  <Box display="flex" flexDirection="column" gap="spacing.2">
                    <TextInput
                      label="Payment requested for"
                      accessibilityLabel="Amount"
                      placeholder="1000"
                      type="number"
                      prefix="INR"
                    />
                    <TextInput
                      label=""
                      accessibilityLabel="Description"
                      placeholder="e.g. Yoga course (description)"
                    />
                    {/* Switch to UPI Only */}
                    <Box display="flex" alignItems="flex-start" justifyContent="space-between" paddingY="spacing.2">
                      <Box display="flex" flexDirection="column" gap="spacing.1">
                        <Text size="small" weight="medium" color="surface.text.gray.subtle">Switch to UPI Only</Text>
                        <Text size="xsmall" color="surface.text.gray.muted">Currently enabled: Cards, netbanking, wallets, and UPI.</Text>
                      </Box>
                      <Switch
                        accessibilityLabel="Switch to UPI Only"
                        isChecked={upiOnly}
                        onChange={({ isChecked }) => setUpiOnly(isChecked)}
                        size="small"
                      />
                    </Box>
                  </Box>

                  {/* Add reference ID / notes */}
                  <Link icon={PlusIcon} iconPosition="right" variant="button" size="small">
                    Add reference ID/ notes
                  </Link>

                  {/* Customer Details + Notify */}
                  <Box display="flex" gap="spacing.3" alignItems="flex-start">
                    {/* Left: inputs */}
                    <Box flex="1" display="flex" flexDirection="column" gap="spacing.2">
                      <Text size="small" weight="medium" color="surface.text.gray.subtle">Customer Details</Text>
                      <PhoneNumberInput
                        label=""
                        accessibilityLabel="Phone number"
                        placeholder="98765 43210"
                      />
                      <TextInput
                        label=""
                        accessibilityLabel="Email id"
                        placeholder="Email id"
                      />
                      <Link icon={PlusIcon} iconPosition="right" variant="button" size="small">
                        Add customer name
                      </Link>
                    </Box>

                    {/* Right: Notify toggles */}
                    <Box display="flex" flexDirection="column" gap="spacing.4" paddingTop="spacing.1">
                      <Box display="flex" alignItems="center" gap="spacing.1">
                        <Text size="small" weight="medium" color="surface.text.gray.subtle">Notify</Text>
                        <InfoIcon size="small" color="surface.icon.gray.muted" />
                      </Box>
                      <Switch
                        accessibilityLabel="Notify via SMS"
                        isChecked={notifySms}
                        onChange={({ isChecked }) => setNotifySms(isChecked)}
                        size="small"
                      />
                      <Switch
                        accessibilityLabel="Notify via Email"
                        isChecked={notifyEmail}
                        onChange={({ isChecked }) => setNotifyEmail(isChecked)}
                        size="small"
                      />
                    </Box>
                  </Box>

                  {/* Advanced Settings accordion */}
                  <Accordion>
                    <AccordionItem
                      title="ADVANCED SETTINGS"
                      description=""
                    >
                      <Box display="flex" flexDirection="column" gap="spacing.3">
                        {/* Set link expiry card */}
                        <Card padding="spacing.3" backgroundColor="surface.background.gray.intense">
                          <CardBody>
                            <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                              <Text size="small" weight="medium" color="surface.text.gray.subtle">Set link expiry</Text>
                              <Switch
                                accessibilityLabel="Set link expiry"
                                isChecked={setExpiry}
                                onChange={({ isChecked }) => setSetExpiry(isChecked)}
                                size="small"
                              />
                            </Box>
                          </CardBody>
                        </Card>

                        {/* Automatic reminders card */}
                        <Card padding="spacing.3" backgroundColor="surface.background.gray.intense">
                          <CardBody>
                            <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                              <Box display="flex" flexDirection="column" gap="spacing.1">
                                <Text size="small" weight="medium" color="surface.text.gray.subtle">Automatic reminders</Text>
                                <Text size="xsmall" color="surface.text.gray.muted">
                                  3 reminders will be automatically sent if the payment hasn't been completed
                                </Text>
                              </Box>
                              <Switch
                                accessibilityLabel="Automatic reminders"
                                isChecked={autoReminders}
                                onChange={({ isChecked }) => setAutoReminders(isChecked)}
                                size="small"
                              />
                            </Box>
                          </CardBody>
                        </Card>
                      </Box>
                    </AccordionItem>
                  </Accordion>
                </>
              )}
            </Box>
          </div>

          {/* ── Right: Preview panel (animates in/out) ── */}
          <div
            style={{
              width: showPreview ? 322 : 0,
              flexShrink: 0,
              overflow: 'hidden',
              transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Fixed-width inner — dot-grid bg, preview + floating controls */}
            <div
              style={{
                width: 322,
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                backgroundImage: 'radial-gradient(circle, #d0d0d0 1px, transparent 1px)',
                backgroundSize: '14px 14px',
                backgroundColor: '#f0f0f0',
              }}
            >
              {/* Mockup */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '32px 20px 80px' }}>
                {previewMode === 'mobile' ? <PhoneMockup /> : <DesktopMockup />}
              </div>

              {/* Floating toolbar — icon buttons at the bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  backgroundColor: 'white',
                  border: '1px solid rgba(67,75,81,0.12)',
                  borderRadius: 8,
                  padding: 8,
                  boxShadow: '0px 2px 4px rgba(41,47,50,0.06)',
                }}
              >
                <IconButton
                  icon={MobileAppIcon}
                  accessibilityLabel="Mobile view"
                  size="medium"
                  onClick={() => setPreviewMode('mobile')}
                  emphasis={previewMode === 'mobile' ? 'intense' : 'subtle'}
                />
                <IconButton
                  icon={MonitorIcon}
                  accessibilityLabel="Desktop view"
                  size="medium"
                  onClick={() => setPreviewMode('desktop')}
                  emphasis={previewMode === 'desktop' ? 'intense' : 'subtle'}
                />
                <div style={{ width: 1, height: 20, backgroundColor: '#e4e6e7', margin: '0 2px' }} />
                <IconButton
                  icon={CrosshairIcon}
                  accessibilityLabel="Reset view"
                  size="medium"
                  emphasis="subtle"
                  onClick={() => setPreviewMode('mobile')}
                />
              </div>
            </div>
          </div>

        </Box>
      </ModalBody>

      <ModalFooter>
        {linkType === 'quick' ? (
          <Box display="flex" flexDirection="column" alignItems="center" gap="spacing.4" width="100%">
            <Box display="flex" gap="spacing.5" width="100%" justifyContent="flex-end">
              <Button variant="tertiary" onClick={handleDismiss}>Cancel</Button>
              <Button variant="primary" onClick={handleCreate}>Create &amp; share link</Button>
            </Box>
            <Link
              variant="button"
              color="primary"
              size="small"
              onClick={() => {
                setLinkType('detailed');
                
              }}
            >
              Need more options?
            </Link>
          </Box>
        ) : (
          <Box display="flex" justifyContent="flex-end" gap="spacing.5" width="100%">
            <Button variant="tertiary" onClick={handleDismiss}>Cancel</Button>
            <Button variant="primary" onClick={handleCreate}>Next</Button>
          </Box>
        )}
      </ModalFooter>
    </Modal>
  );
};
