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
  TextInput,
  PhoneNumberInput,
  Switch,
  Card,
  CardBody,
  Checkbox,
  ChipGroup,
  Chip,
  PlusIcon,
  MinusIcon,
  TrashIcon,
  CloseIcon,
  MobileAppIcon,
  MonitorIcon,
  IconButton,
  InfoIcon,
  Tooltip,
  TooltipInteractiveWrapper,
  ChevronDownIcon,
  ChevronUpIcon,
  Badge,
} from '@razorpay/blade/components';

// ─── Types ───────────────────────────────────────────────────────────────────

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

type PreviewMode = 'mobile' | 'desktop';

// ─── Amount in words ──────────────────────────────────────────────────────────

const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function numToWords(n: number): string {
  if (n === 0) return 'zero';
  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
  if (n < 1000) return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + numToWords(n % 100) : '');
  if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '');
  if (n < 10000000) return numToWords(Math.floor(n / 100000)) + ' lakh' + (n % 100000 ? ' ' + numToWords(n % 100000) : '');
  return numToWords(Math.floor(n / 10000000)) + ' crore' + (n % 10000000 ? ' ' + numToWords(n % 10000000) : '');
}

function amountToWords(val: string): string {
  const n = parseInt(val.replace(/,/g, ''), 10);
  if (!val || isNaN(n) || n === 0) return '';
  const words = numToWords(n);
  return words.charAt(0).toUpperCase() + words.slice(1) + ' only';
}

// ─── Phone mockup ─────────────────────────────────────────────────────────────

const PhoneMockup = () => (
  <div style={{ width: 216, height: 339, backgroundColor: '#2d55e1', borderRadius: 9.6, overflow: 'hidden', border: '0.6px solid #d8d8d8', position: 'relative', flexShrink: 0 }}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #1a3bbf 0%, #2d55e1 50%, #1e40af 100%)' }} />
    <div style={{ position: 'absolute', top: 14, left: 12, right: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(200,210,255,0.9)', letterSpacing: 1 }}>razorpay</div>
        <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>✓ Razorpay Trusted Business</div>
      </div>
      <div style={{ width: 24, height: 24, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white' }}>👤</div>
    </div>
    <div style={{ position: 'absolute', top: 72, left: 0, right: 0, textAlign: 'center' }}>
      <div style={{ fontSize: 7, color: 'rgba(220,225,255,0.85)', marginBottom: 4 }}>Total amount to pay</div>
      <div style={{ fontSize: 26, fontWeight: 600, color: 'white', letterSpacing: -0.8 }}>₹4,460</div>
    </div>
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 178, background: 'linear-gradient(180deg, #fafafa 0%, #fff 28%, #fff 72%, #f7f7f8 100%)', borderTopLeftRadius: 9.6, borderTopRightRadius: 9.6, border: '0.6px solid #e4e6e7', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: '#0a0a0a' }}>Contact details</div>
        <div style={{ fontSize: 8.4, color: '#7d7d7d' }}>Enter mobile number to continue</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, height: 29, border: '0.6px solid #e4e6e7', borderRadius: 7, padding: '0 10px', backgroundColor: 'white' }}>
        <span style={{ fontSize: 8 }}>🇮🇳 +91</span>
        <span style={{ fontSize: 8, color: '#9f9f9f' }}>99999 99999</span>
      </div>
      <div style={{ height: 29, backgroundColor: '#000', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', cursor: 'pointer' }}>
        <span style={{ fontSize: 8.4, fontWeight: 500, color: 'white' }}>Continue</span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>→</span>
      </div>
      <div style={{ textAlign: 'center', fontSize: 7, color: '#9f9f9f', position: 'absolute', bottom: 8, left: 0, right: 0 }}>
        By proceeding, I agree to Razorpay's <span style={{ textDecoration: 'underline' }}>Privacy Notice</span>
      </div>
    </div>
  </div>
);

const DesktopMockup = () => (
  <div style={{ width: '100%', maxWidth: 260, backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e4e6e7', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
    <div style={{ backgroundColor: '#2d55e1', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(200,210,255,0.9)', letterSpacing: 1 }}>razorpay</div>
      <div style={{ fontSize: 6, color: 'rgba(255,255,255,0.6)' }}>✓ Razorpay Trusted Business</div>
    </div>
    <div style={{ padding: '14px', textAlign: 'center', backgroundColor: '#1e3fba', color: 'white' }}>
      <div style={{ fontSize: 7, color: 'rgba(220,225,255,0.85)', marginBottom: 4 }}>Total amount to pay</div>
      <div style={{ fontSize: 22, fontWeight: 600 }}>₹4,460</div>
    </div>
    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 500, color: '#0a0a0a' }}>Contact details</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 28, border: '1px solid #e4e6e7', borderRadius: 6, padding: '0 8px', backgroundColor: 'white' }}>
        <span style={{ fontSize: 8 }}>🇮🇳 +91</span>
        <span style={{ fontSize: 8, color: '#9f9f9f', marginLeft: 4 }}>99999 99999</span>
      </div>
      <div style={{ height: 28, backgroundColor: '#000', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', cursor: 'pointer' }}>
        <span style={{ fontSize: 8, fontWeight: 500, color: 'white' }}>Continue</span>
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>→</span>
      </div>
    </div>
  </div>
);

// ─── Advanced Settings Card ───────────────────────────────────────────────────

type AdvancedCardProps = {
  title: string;
  description?: string;
  isChecked: boolean;
  onChange: (v: boolean) => void;
  children?: React.ReactNode;
};

const AdvancedCard = ({ title, description, isChecked, onChange, children }: AdvancedCardProps) => (
  <div style={{ borderRadius: 4, overflow: 'hidden' }}>
  <Card padding="spacing.3" backgroundColor="surface.background.gray.intense">
    <CardBody>
      <Box display="flex" flexDirection="column" gap="spacing.5">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box flex="1" marginRight="spacing.4">
            <Text size="small" weight="medium" color="surface.text.gray.subtle">{title}</Text>
            {description && <Text size="small" color="surface.text.gray.muted">{description}</Text>}
          </Box>
          <Switch accessibilityLabel={title} isChecked={isChecked} onChange={({ isChecked: v }) => onChange(v)} size="small" />
        </Box>
        {isChecked && children}
      </Box>
    </CardBody>
  </Card>
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const CreatePaymentLinkModalV1 = ({ isOpen, onDismiss }: Props) => {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('mobile');
  const [amount, setAmount] = useState('');
  const [upiOnly, setUpiOnly] = useState(true);
  const [notifySms, setNotifySms] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(true);
  const [setExpiry, setSetExpiry] = useState(false);
  const [expiryDays, setExpiryDays] = useState('');
  const [partialPayments, setPartialPayments] = useState(false);
  const [splitEqually, setSplitEqually] = useState(true);
  const [installments, setInstallments] = useState(4);
  const [autoReminders, setAutoReminders] = useState(false);
  const [showCustomerName, setShowCustomerName] = useState(false);
  const [showReferenceId, setShowReferenceId] = useState(false);
  const [extraNotes, setExtraNotes] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const reset = () => {
    setPreviewMode('mobile');
    setAmount('');
    setUpiOnly(true);
    setNotifySms(true);
    setNotifyEmail(false);
    setAdvancedOpen(true);
    setSetExpiry(false);
    setExpiryDays('');
    setPartialPayments(false);
    setSplitEqually(true);
    setInstallments(4);
    setAutoReminders(false);
    setShowCustomerName(false);
    setShowReferenceId(false);
    setExtraNotes([]);
    setIsScrolled(false);
  };

  const handleDismiss = () => { onDismiss(); reset(); };

  const helpText = amountToWords(amount);

  return (
    <>
      {/* Clamp this modal to 760px — Blade's size="large" defaults to 1024px */}
      <style>{`div[class*="Modalweb__ModalContent"] { max-width: 760px !important; }`}</style>
    <Modal isOpen={isOpen} onDismiss={handleDismiss} size="large">
      <ModalHeader title="Create Payment Link" />

      <ModalBody padding="spacing.0">
        {/* Fixed 474px body height — Figma spec, no outer scroll */}
        <div style={{ display: 'flex', width: '100%', height: 474, overflow: 'hidden' }}>

          {/* ── Left: 393px scrollable form (Figma spec) ── */}
          <div
            style={{ flex: 1, minWidth: 0, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}
            onScroll={(e) => setIsScrolled((e.currentTarget as HTMLDivElement).scrollTop > 8)}
          >

            {/* Sticky amount header — glass blur */}
            <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              <div style={{
                padding: '16px 16px 0',
                backgroundColor: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}>
                <TextInput
                  label="Payment requested for"
                  accessibilityLabel="Amount"
                  placeholder="1000"
                  type="number"
                  prefix="INR"
                  value={amount}
                  onChange={({ value }) => setAmount(value ?? '')}
                  helpText={helpText || undefined}
                />
              </div>
              {/* Fade gradient — only visible after scrolling */}
              <div style={{
                height: 8,
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, transparent 100%)',
                pointerEvents: 'none',
                opacity: isScrolled ? 1 : 0,
                transition: 'opacity 200ms ease',
              }} />
            </div>

            {/* Scrollable body below sticky amount */}
            <div style={{ padding: '0 0 40px', width: '100%' }}>
              {/* Amount + description + UPI toggle */}
              <Box display="flex" flexDirection="column" gap="spacing.2" marginBottom="spacing.8" paddingX="spacing.5">
                <TextInput label="" accessibilityLabel="Description" placeholder="e.g. Yoga course (description)" />
                <Box display="flex" alignItems="center" justifyContent="space-between" paddingY="spacing.2">
                  <Box flex="1" marginRight="spacing.4">
                    <Text size="small" weight="medium" color="surface.text.gray.subtle">Switch to UPI Only</Text>
                    <Text size="small" color="surface.text.gray.muted">Currently enabled:  Cards, netbanking, wallets, and UPI.</Text>
                  </Box>
                  <Switch accessibilityLabel="Switch to UPI Only" isChecked={upiOnly} onChange={({ isChecked }) => setUpiOnly(isChecked)} size="small" />
                </Box>
              </Box>

              {/* Reference ID section — below UPI toggle, matching Figma */}
              <Box paddingX="spacing.5" marginBottom="spacing.8">
                {showReferenceId ? (
                  <Box display="flex" flexDirection="column" gap="spacing.2">
                    <Text size="small" weight="medium" color="surface.text.gray.subtle">Reference ID/ Notes</Text>
                    {/* Reference ID input + × — same 28px right column as customer rows */}
                    <Box display="flex" alignItems="center" gap="spacing.3">
                      <Box flex="1"><TextInput label="" accessibilityLabel="Reference ID" placeholder="eg. X1BAA8" /></Box>
                      <div style={{ width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton icon={CloseIcon} accessibilityLabel="Remove reference ID" size="small" onClick={() => { setShowReferenceId(false); setExtraNotes([]); }} />
                      </div>
                    </Box>
                    {/* Extra note inputs + × */}
                    {extraNotes.map((_, i) => (
                      <Box key={i} display="flex" alignItems="center" gap="spacing.3">
                        <Box flex="1"><TextInput label="" accessibilityLabel={`Note ${i + 1}`} placeholder="Additional notes (eg. order ID)" /></Box>
                        <div style={{ width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconButton icon={CloseIcon} accessibilityLabel={`Remove note ${i + 1}`} size="small" onClick={() => setExtraNotes(n => n.filter((__, j) => j !== i))} />
                        </div>
                      </Box>
                    ))}
                    <Link icon={PlusIcon} iconPosition="right" variant="button" size="small" onClick={() => setExtraNotes(n => [...n, ''])}>
                      Add new notes
                    </Link>
                  </Box>
                ) : (
                  <Link icon={PlusIcon} iconPosition="right" variant="button" size="small" onClick={() => setShowReferenceId(true)}>
                    Add reference ID/ notes
                  </Link>
                )}
              </Box>

            {/* Customer Details + Notify — row-per-field so everything aligns */}
            <Box display="flex" flexDirection="column" gap="spacing.3" marginBottom="spacing.8" paddingX="spacing.5">
              {/* Header row */}
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Text size="small" weight="medium" color="surface.text.gray.subtle">Customer Details</Text>
                <Box display="flex" alignItems="center" gap="spacing.1">
                  <Text size="small" weight="medium" color="surface.text.gray.subtle">Notify</Text>
                  <Tooltip content="Customer will be notified via the selected channels when payment link is created or expires.">
                    <TooltipInteractiveWrapper>
                      <InfoIcon size="small" color="surface.icon.gray.muted" />
                    </TooltipInteractiveWrapper>
                  </Tooltip>
                </Box>
              </Box>

              {/* Fixed right col = 28px to hold Switch or IconButton — ensures all inputs same width */}
              {/* Row: Phone + SMS toggle */}
              <Box display="flex" alignItems="center" gap="spacing.3">
                <Box flex="1">
                  <PhoneNumberInput label="" accessibilityLabel="Phone number" placeholder="98765 43210" />
                </Box>
                <div style={{ width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Switch accessibilityLabel="Notify via SMS" isChecked={notifySms} onChange={({ isChecked }) => setNotifySms(isChecked)} size="small" />
                </div>
              </Box>

              {/* Row: Email + Email toggle */}
              <Box display="flex" alignItems="center" gap="spacing.3">
                <Box flex="1">
                  <TextInput label="" accessibilityLabel="Email id" placeholder="Email id" />
                </Box>
                <div style={{ width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Switch accessibilityLabel="Notify via Email" isChecked={notifyEmail} onChange={({ isChecked }) => setNotifyEmail(isChecked)} size="small" />
                </div>
              </Box>

              {/* Row: Customer name + × (when shown) */}
              {showCustomerName ? (
                <Box display="flex" alignItems="center" gap="spacing.3">
                  <Box flex="1">
                    <TextInput label="" accessibilityLabel="Customer name" placeholder="e.g. John Doe" />
                  </Box>
                  <div style={{ width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton icon={CloseIcon} accessibilityLabel="Remove customer name" size="small" onClick={() => setShowCustomerName(false)} />
                  </div>
                </Box>
              ) : (
                <Link icon={PlusIcon} iconPosition="right" variant="button" size="small" onClick={() => setShowCustomerName(true)}>Add customer name</Link>
              )}
            </Box>

            {/* Advanced Settings */}
            <Box display="flex" flexDirection="column" gap="spacing.3" marginTop="spacing.8" paddingX="spacing.5">
              <button
                onClick={() => setAdvancedOpen(v => !v)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <Box display="flex" alignItems="center" gap="spacing.2">
                  <span style={{ fontSize: 12, fontWeight: 400, color: '#050505' }}>
                    Advanced Settings
                  </span>
                  <Badge color="neutral" size="small">Optional</Badge>
                </Box>
                {advancedOpen ? <ChevronUpIcon size="small" color="surface.icon.gray.muted" /> : <ChevronDownIcon size="small" color="surface.icon.gray.muted" />}
              </button>

              {advancedOpen && (
                <Box display="flex" flexDirection="column" gap="spacing.3">

                  {/* Card 1: Set link expiry */}
                  <AdvancedCard title="Set link expiry" isChecked={setExpiry} onChange={setSetExpiry}>
                    {/* Figma: chip group with expiry options */}
                    <ChipGroup label="" selectionType="single" name="expiry" value={expiryDays} onChange={({ values }) => setExpiryDays((values as string[])[0] ?? '')}>
                      <Chip value="1d">1 day</Chip>
                      <Chip value="3d">3 days</Chip>
                      <Chip value="4d">4 days</Chip>
                      <Chip value="custom">Customer</Chip>
                    </ChipGroup>
                  </AdvancedCard>

                  {/* Card 2: Allow partial payments */}
                  <AdvancedCard title="Allow partial payments" description="Customer will be allowed to pay in installments" isChecked={partialPayments} onChange={setPartialPayments}>
                    {/* Checkbox + counter */}
                    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="spacing.3">
                      <Checkbox isChecked={splitEqually} size="small" onChange={({ isChecked: v }) => setSplitEqually(v)}>
                        Split equally in installments of
                      </Checkbox>
                      <Box display="flex" alignItems="center" gap="spacing.2" borderWidth="thin" borderColor="surface.border.gray.normal" borderRadius="medium" paddingX="spacing.2" paddingY="spacing.1" backgroundColor="surface.background.gray.intense">
                        <IconButton icon={MinusIcon} accessibilityLabel="Decrease" size="small" onClick={() => setInstallments(n => Math.max(1, n - 1))} />
                        <Text size="small" weight="semibold" color="surface.text.gray.subtle">{installments}</Text>
                        <IconButton icon={PlusIcon} accessibilityLabel="Increase" size="small" onClick={() => setInstallments(n => n + 1)} />
                      </Box>
                    </Box>
                    {/* Installment table */}
                    <div style={{ border: '1px solid rgba(67,75,81,0.12)', borderRadius: 8, overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 1fr 36px', backgroundColor: '#f8f8f8', borderBottom: '1px solid rgba(67,75,81,0.12)' }}>
                        {['#', 'Amount', 'Due Date', ''].map(h => (
                          <div key={h} style={{ padding: '8px 12px', fontSize: 12, fontWeight: 500, color: '#616d75' }}>{h}</div>
                        ))}
                      </div>
                      {Array.from({ length: installments }).map((_, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 1fr 36px', borderBottom: i < installments - 1 ? '1px solid rgba(67,75,81,0.12)' : 'none', alignItems: 'center' }}>
                          <div style={{ padding: '8px 12px', fontSize: 14, color: '#292f32' }}>{i + 1}</div>
                          <div style={{ padding: '4px 8px' }}>
                            <TextInput label="" accessibilityLabel={`Amount ${i + 1}`} placeholder="₹ 0" size="medium" />
                          </div>
                          <div style={{ padding: '4px 8px' }}>
                            <TextInput label="" accessibilityLabel={`Due date ${i + 1}`} placeholder="DD/MM/YYYY" size="medium" />
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconButton icon={TrashIcon} accessibilityLabel="Delete row" size="small" onClick={() => setInstallments(n => Math.max(1, n - 1))} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Text size="small" color="surface.text.gray.subtle" marginTop="spacing.2">Update amount and due date as per requirement</Text>
                  </AdvancedCard>

                  {/* Card 3: Automatic reminders */}
                  <AdvancedCard title="Automatic reminders" description="3 reminders will be automatically sent if the payment hasn't been completed" isChecked={autoReminders} onChange={setAutoReminders}>
                    {/* Figma: "Reminders are turned on + change schedule here" */}
                    <Box display="flex" alignItems="center" gap="spacing.1">
                      <Text size="small" color="surface.text.gray.subtle">Reminders are turned on</Text>
                      <Link size="small" variant="button">change schedule here</Link>
                    </Box>
                  </AdvancedCard>

                </Box>
              )}
            </Box>
            </div>{/* end scrollable body */}
          </div>

          {/* ── Right: dot-grid preview, no padding/gap ── */}
          <div
            style={{
              width: 322,
              flexShrink: 0,
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '32px 20px 80px', overflow: 'hidden' }}>
                {previewMode === 'mobile' ? <PhoneMockup /> : <DesktopMockup />}
              </div>

              {/* Mobile / Desktop switcher */}
              <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', backgroundColor: 'white', border: '1px solid rgba(67,75,81,0.12)', borderRadius: 10, padding: 4, boxShadow: '0px 2px 8px rgba(41,47,50,0.1)', whiteSpace: 'nowrap' }}>
                {([
                  { mode: 'mobile', Icon: MobileAppIcon },
                  { mode: 'desktop', Icon: MonitorIcon },
                ] as const).map(({ mode, Icon }) => (
                  <button
                    key={mode}
                    onClick={() => setPreviewMode(mode)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', backgroundColor: previewMode === mode ? '#f0f0f0' : 'transparent' }}
                  >
                    <Icon size="small" color={previewMode === mode ? 'surface.icon.gray.normal' : 'surface.icon.gray.muted'} />
                  </button>
                ))}
              </div>
          </div>

        </div>
      </ModalBody>

      <ModalFooter>
        <Box display="flex" justifyContent="flex-end" gap="spacing.5" width="100%">
          <Button variant="tertiary" onClick={handleDismiss}>Cancel</Button>
          <Button variant="primary" onClick={handleDismiss}>Next</Button>
        </Box>
      </ModalFooter>
    </Modal>
    </>
  );
};
