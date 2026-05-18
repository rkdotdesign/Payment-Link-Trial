import { useState } from 'react';
import {
  Box,
  Text,
  Heading,
  Button,
  ButtonGroup,
  Badge,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Amount,
  Link,
  Tabs,
  TabList,
  TabItem,
  Tooltip,
  TooltipInteractiveWrapper,
  IconButton,
  Divider,
  Dropdown,
  DropdownButton,
  DropdownOverlay,
  ActionList,
  ActionListItem,
  ActionListItemIcon,
  PlusIcon,
  ExternalLinkIcon,
  InfoIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  BellIcon,
  TrendingUpIcon,
  UploadCloudIcon,
  DownloadCloudIcon,
  DownloadIcon,
  SearchIcon,
} from '@razorpay/blade/components';
import { PaymentMethodModal } from '../components/PaymentMethodModal';
import { CustomerPreviewModal } from '../components/CustomerPreviewModal';
import { CreatePaymentLinkModalV1 } from '../components/CreatePaymentLinkModalV1';

// ─── Types ───────────────────────────────────────────────────────────────────

type PaymentLink = {
  id: string;
  linkId: string;
  createdAt: string;
  amount: number;
  receiptNo: string;
  link: string;
  status: 'Issued' | 'Captured' | 'Expired' | 'Cancelled';
};

// ─── Data ────────────────────────────────────────────────────────────────────

const paymentLinks: PaymentLink[] = [
  { id: '1',  linkId: 'pay_LHadsJ529',  createdAt: '21 Jan 2024, 10:21 AM', amount: 15450.75, receiptNo: '6482937429',  link: 'https://rzp.io/rzp/72bCOkP', status: 'Captured'  },
  { id: '2',  linkId: 'pay_LGadms271',  createdAt: '21 Jan 2024, 10:21 AM', amount: 18750.50, receiptNo: '1242940202',  link: 'https://rzp.io/rzp/72bCOkP', status: 'Issued'    },
  { id: '3',  linkId: 'pay_LHadsJ529',  createdAt: '21 Jan 2024, 10:21 AM', amount: 15450.75, receiptNo: '6482937429',  link: 'https://rzp.io/rzp/72bCOkP', status: 'Captured'  },
  { id: '4',  linkId: 'pay_LKJdsm453',  createdAt: '21 Jan 2024, 10:21 AM', amount: 12300.00, receiptNo: '9876543210',  link: 'https://rzp.io/rzp/72bCOkP', status: 'Expired'   },
  { id: '5',  linkId: 'pay_LHgfdJ123',  createdAt: '21 Jan 2024, 10:21 AM', amount: 24500.90, receiptNo: '4567891230',  link: 'https://rzp.io/rzp/72bCOkP', status: 'Captured'  },
  { id: '6',  linkId: 'pay_LPladJ890',  createdAt: '21 Jan 2024, 10:21 AM', amount: 5500.25,  receiptNo: '3216549870',  link: 'https://rzp.io/rzp/72bCOkP', status: 'Captured'  },
  { id: '7',  linkId: 'pay_LHgfdJ123',  createdAt: '21 Jan 2024, 10:21 AM', amount: 24500.90, receiptNo: '4567891230',  link: 'https://rzp.io/rzp/72bCOkP', status: 'Captured'  },
  { id: '8',  linkId: 'pay_LQWads720',  createdAt: '21 Jan 2024, 10:21 AM', amount: 8750.00,  receiptNo: '7894561230',  link: 'https://rzp.io/rzp/72bCOkP', status: 'Captured'  },
  { id: '9',  linkId: 'pay_LPladJ890',  createdAt: '21 Jan 2024, 10:21 AM', amount: 5500.25,  receiptNo: '3216549870',  link: 'https://rzp.io/rzp/72bCOkP', status: 'Captured'  },
  { id: '10', linkId: 'pay_LXYZabc987', createdAt: '21 Jan 2024, 10:21 AM', amount: 15600.00, receiptNo: '1122334455',  link: 'https://rzp.io/rzp/72bCOkP', status: 'Captured'  },
  { id: '11', linkId: 'pay_LAbcd111',   createdAt: '21 Jan 2024, 10:21 AM', amount: 3200.00,  receiptNo: '5544332211',  link: 'https://rzp.io/rzp/72bCOkP', status: 'Cancelled' },
  { id: '12', linkId: 'pay_LEfgh222',   createdAt: '21 Jan 2024, 10:21 AM', amount: 9900.00,  receiptNo: '9988776655',  link: 'https://rzp.io/rzp/72bCOkP', status: 'Issued'    },
];

const statusColorMap: Record<PaymentLink['status'], 'information' | 'positive' | 'negative' | 'neutral'> = {
  Issued: 'information', Captured: 'positive', Expired: 'negative', Cancelled: 'neutral',
};

const statusCounts = {
  All: paymentLinks.length,
  Issued: paymentLinks.filter(p => p.status === 'Issued').length,
  Captured: paymentLinks.filter(p => p.status === 'Captured').length,
  Expired: paymentLinks.filter(p => p.status === 'Expired').length,
  Cancelled: paymentLinks.filter(p => p.status === 'Cancelled').length,
};

// ─── Folder illustration ──────────────────────────────────────────────────────

const FolderIllustration = () => (
  <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 68C12 62.5 16.5 58 22 58H60L72 74H140C145.5 74 150 78.5 150 84V134C150 139.5 145.5 144 140 144H22C16.5 144 12 139.5 12 134V68Z" fill="#A8C8F0" />
    <path d="M12 84C12 78.5 16.5 74 22 74H140C145.5 74 150 78.5 150 84V134C150 139.5 145.5 144 140 144H22C16.5 144 12 139.5 12 134V84Z" fill="#BDD5F5" />
    <ellipse cx="112" cy="50" rx="28" ry="28" fill="#C8DCF5" />
    <ellipse cx="112" cy="50" rx="22" ry="22" fill="#D8E8F8" />
    <ellipse cx="112" cy="50" rx="14" ry="14" fill="#E4F0FB" />
    <ellipse cx="108" cy="47" rx="6" ry="4" fill="white" opacity="0.4" />
    <ellipse cx="96" cy="42" rx="28" ry="28" fill="#B8CEED" />
    <ellipse cx="96" cy="42" rx="22" ry="22" fill="#C8DCF5" />
    <ellipse cx="96" cy="42" rx="14" ry="14" fill="#D8E8F8" />
    <ellipse cx="92" cy="39" rx="6" ry="4" fill="white" opacity="0.4" />
    <ellipse cx="80" cy="36" rx="28" ry="28" fill="#A8C2E8" />
    <ellipse cx="80" cy="36" rx="22" ry="22" fill="#BDD5F5" />
    <ellipse cx="80" cy="36" rx="14" ry="14" fill="#CDE0F8" />
    <ellipse cx="76" cy="33" rx="6" ry="4" fill="white" opacity="0.5" />
    <path d="M12 84C12 78.5 16.5 74 22 74H80L72 84H12Z" fill="#A8C8F0" opacity="0.6" />
  </svg>
);

// ─── Stat column ──────────────────────────────────────────────────────────────

type StatColProps = {
  label: string;
  indicatorColor: 'positive' | 'information' | 'notice';
  labelColor: 'feedback.text.positive.intense' | 'surface.text.gray.normal' | 'surface.text.gray.muted';
  value: number;
  changeText: string;
  fromText: string;
};

const StatCol = ({ label, indicatorColor, labelColor, value, changeText, fromText }: StatColProps) => (
  <Box flex="1" minWidth="spacing.0">
    <Box display="flex" alignItems="center" gap="spacing.2" marginBottom="spacing.3">
      <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: indicatorColor === 'positive' ? '#12b76a' : indicatorColor === 'information' ? '#0070f3' : '#f79009', flexShrink: 0 }} />
      <Text size="xsmall" weight="semibold" color={labelColor}>{label}</Text>
      <ChevronRightIcon size="small" color="surface.icon.gray.muted" />
    </Box>
    <Box display="flex" alignItems="baseline" gap="spacing.2" marginBottom="spacing.1">
      <Amount value={value} type="heading" size="medium" weight="semibold" suffix="none" />
      <Box display="flex" alignItems="center" gap="spacing.1">
        <TrendingUpIcon size="xsmall" color="feedback.icon.positive.intense" />
        <Text size="xsmall" weight="semibold" color="feedback.text.positive.intense">{changeText}</Text>
      </Box>
    </Box>
    <Text size="xsmall" color="surface.text.gray.muted">{fromText}</Text>
  </Box>
);

// ─── Status filter chip ───────────────────────────────────────────────────────

type StatusChipProps = {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
};

const StatusChip = ({ label, count, isActive, onClick }: StatusChipProps) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: 4,
      height: 32, padding: isActive ? '6px 10px 6px 8px' : '6px 8px',
      borderRadius: 8, border: 'none', cursor: 'pointer',
      backgroundColor: isActive ? '#e9eaeb' : 'transparent',
      boxShadow: isActive ? 'inset 0px 2px 4px 0px rgba(0,0,0,0.02)' : 'none',
    }}
  >
    {/* Checkbox icon */}
    <div style={{ width: 16, height: 16, flexShrink: 0, borderRadius: 4, border: isActive ? 'none' : '1.5px solid #bcc1c5', backgroundColor: isActive ? '#4a5568' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isActive && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
    <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 500, color: '#050505', letterSpacing: '-0.182px' }}>{label}</span>
    <span style={{ fontSize: 12, fontWeight: 400, color: '#606c75', letterSpacing: '-0.156px' }}>{count}</span>
  </button>
);

// ─── Page component ───────────────────────────────────────────────────────────

export const PaymentLinksPage = () => {
  const [pageTab, setPageTab] = useState('links');
  const [timePeriod, setTimePeriod] = useState('7d');
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const [merchantModalOpen, setMerchantModalOpen] = useState(false);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [v1Open, setV1Open] = useState(false);
  const [activeStatus, setActiveStatus] = useState<'All' | 'Issued' | 'Captured' | 'Expired' | 'Cancelled'>('All');

  return (
    <Box>
      {/* ── Row 1: Title | Time filter | Split create button ── */}
      <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="spacing.6">
        <Box display="flex" alignItems="center" gap="spacing.3">
          <Heading size="large">Payment Links</Heading>
          <Tooltip content="Generate a unique link from your Dashboard or via APIs and share it with customers via email, SMS etc." placement="right">
            <TooltipInteractiveWrapper>
              <span
                onMouseEnter={() => setIsInfoHovered(true)}
                onMouseLeave={() => setIsInfoHovered(false)}
                style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
              >
                <InfoIcon size="medium" color={isInfoHovered ? 'surface.icon.gray.normal' : 'surface.icon.gray.muted'} />
              </span>
            </TooltipInteractiveWrapper>
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center" gap="spacing.4">
          <Tabs variant="filled" value={timePeriod} onChange={(v) => setTimePeriod(v)} isFullWidthTabItem>
            <TabList>
              <TabItem value="7d">Last 7 days</TabItem>
              <TabItem value="30d">30 days</TabItem>
              <TabItem value="90d">90 days</TabItem>
              <TabItem value="custom">Custom</TabItem>
            </TabList>
          </Tabs>
          <ButtonGroup variant="primary">
            <Button icon={PlusIcon} iconPosition="left" onClick={() => setV1Open(true)}>
              Create Payment Link
            </Button>
            <Dropdown>
              <DropdownButton icon={ChevronDownIcon} accessibilityLabel="More create options" />
              <DropdownOverlay defaultPlacement="bottom-end">
                <ActionList>
                  <ActionListItem title="Bulk Upload" value="bulk-upload" leading={<ActionListItemIcon icon={UploadCloudIcon} />} onClick={() => {}} />
                  <ActionListItem title="Download Template" value="download-template" leading={<ActionListItemIcon icon={DownloadCloudIcon} />} onClick={() => {}} />
                </ActionList>
              </DropdownOverlay>
            </Dropdown>
          </ButtonGroup>
        </Box>
      </Box>

      {/* ── Row 2: Stats cards ── */}
      <Box display="flex" gap="spacing.4" marginBottom="spacing.6" alignItems="stretch">
        {/* Left card — Total Requested */}
        <div style={{ width: '220px', height: '178px', flexShrink: 0, backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid rgba(67,75,81,0.1)', padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box display="flex" alignItems="center" gap="spacing.1" marginBottom="spacing.3">
            <Text size="xsmall" weight="semibold" color="surface.text.gray.muted">TOTAL REQUESTED</Text>
            <ChevronRightIcon size="small" color="surface.icon.gray.muted" />
          </Box>
          <Box display="flex" alignItems="center" gap="spacing.2" marginBottom="spacing.2">
            <Amount value={20000} type="heading" size="xlarge" weight="semibold" suffix="none" />
            <Box display="flex" alignItems="center" gap="spacing.1">
              <TrendingUpIcon size="xsmall" color="feedback.icon.positive.intense" />
              <Text size="xsmall" weight="semibold" color="feedback.text.positive.intense">20%</Text>
            </Box>
          </Box>
          <Text size="small" color="surface.text.gray.muted">from 24 payment links</Text>
        </div>

        {/* Right stats card */}
        <div style={{ flex: 1, height: '178px', background: '#ffffff', borderRadius: '12px', border: '1px solid rgba(67,75,81,0.1)', padding: '20px 24px 6px 24px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '32px', flex: 1, paddingRight: '160px' }}>
            <StatCol label="RECEIVED" indicatorColor="positive" labelColor="feedback.text.positive.intense" value={12000} changeText="20%" fromText="from 10 payment links" />
            <StatCol label="PENDING" indicatorColor="information" labelColor="surface.text.gray.normal" value={12000} changeText="20%" fromText="from 10 payment links" />
            <StatCol label="EXPIRED" indicatorColor="notice" labelColor="surface.text.gray.muted" value={12000} changeText="20%" fromText="from 10 payment links" />
          </div>
          <div style={{ position: 'absolute', right: -8, bottom: 0, width: '172px', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <FolderIllustration />
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', display: 'flex', gap: '3px' }}>
            <div style={{ flex: 6, backgroundColor: '#6EE7A0', borderRadius: '3px 0 0 3px' }} />
            <div style={{ flex: 3, backgroundColor: '#A5B4FC' }} />
            <div style={{ flex: 1, backgroundColor: '#D8B4FE', borderRadius: '0 3px 3px 0' }} />
          </div>
        </div>
      </Box>

      {/* ── Row 3: Page tabs + right actions ── */}
      <Box display="flex" alignItems="flex-end" justifyContent="space-between">
        <Tabs variant="bordered" size="large" value={pageTab} onChange={(v) => setPageTab(v)}>
          <TabList>
            <TabItem value="links">Payment Links</TabItem>
            <TabItem value="batch">Batch Uploads</TabItem>
          </TabList>
        </Tabs>
        <Box display="flex" alignItems="center" gap="spacing.5" paddingBottom="spacing.3">
          <Link href="#" size="small" icon={BellIcon} iconPosition="left">Set reminders</Link>
          <Link href="#" size="small" icon={ExternalLinkIcon} iconPosition="right">Documentation</Link>
        </Box>
      </Box>

      <Divider marginBottom="spacing.4" />

      {/* ── Unified table card: toolbar rows + Blade Table merged ── */}
      <div style={{ border: '1px solid #e4e6e7', borderRadius: '12px', overflow: 'hidden', boxShadow: '0px 6px 32px 4px rgba(184,196,214,0.08)', backgroundColor: 'white' }}>

        {/* ── Toolbar Row 1: Status filter chips + Search ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #e4e6e7', backgroundColor: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {(['All', 'Issued', 'Captured', 'Expired', 'Cancelled'] as const).map((s) => (
              <StatusChip key={s} label={s} count={statusCounts[s]} isActive={activeStatus === s} onClick={() => setActiveStatus(s)} />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', height: 36, border: '1px solid #dee1e3', borderRadius: 8, backgroundColor: 'white', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px 0 12px' }}>
                <SearchIcon size="small" color="surface.icon.gray.muted" />
              </div>
              <input placeholder="Search..." style={{ border: 'none', outline: 'none', fontSize: 14, color: '#050505', backgroundColor: 'transparent', minWidth: 160, fontFamily: 'inherit' }} />
              <button style={{ display: 'flex', alignItems: 'center', gap: 4, height: '100%', padding: '0 8px', borderWidth: 0, borderLeftWidth: 1, borderLeftStyle: 'solid' as const, borderLeftColor: '#e4e6e7', backgroundColor: 'transparent', cursor: 'pointer' }}>
                <span style={{ fontSize: 13, color: '#616d75' }}>in</span>
                <span style={{ fontSize: 13, color: '#292f32' }}>Link ID</span>
                <ChevronDownIcon size="xsmall" color="surface.icon.gray.muted" />
              </button>
            </div>
            <IconButton icon={SearchIcon} accessibilityLabel="Search" size="medium" onClick={() => {}} />
          </div>
        </div>

        {/* ── Toolbar Row 2: Filter dropdowns + Export All ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #e4e6e7', backgroundColor: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', height: 32, border: '1px solid #dee1e3', borderRadius: 8, backgroundColor: 'white', overflow: 'hidden' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '0 8px 0 12px', borderWidth: 0, backgroundColor: 'transparent', cursor: 'pointer', height: '100%', fontSize: 12, fontWeight: 600, color: '#050505' }}>
                Status: All
                <ChevronDownIcon size="xsmall" color="surface.icon.gray.muted" />
              </button>
              <div style={{ width: 1, height: 20, backgroundColor: '#dee1e3' }} />
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8px', borderWidth: 0, backgroundColor: 'transparent', cursor: 'pointer', height: '100%' }}>
                <CloseIcon size="xsmall" color="surface.icon.gray.muted" />
              </button>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, height: 32, padding: '0 12px', border: '1px solid #dee1e3', borderRadius: 8, backgroundColor: 'white', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#050505' }}>
              Currency
              <ChevronDownIcon size="xsmall" color="surface.icon.gray.muted" />
            </button>
          </div>
          <Button variant="secondary" icon={DownloadIcon} iconPosition="left" size="small" onClick={() => {}}>
            Export All
          </Button>
        </div>

        {/* ── Blade Table (border/radius hidden by outer overflow:hidden) ── */}
        <Table data={{ nodes: paymentLinks }} selectionType="multiple">
          {(tableData) => (
            <>
              <TableHeader>
                <TableHeaderRow>
                  <TableHeaderCell>Payment Link ID</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Receipt No.</TableHeaderCell>
                  <TableHeaderCell>Payment Link</TableHeaderCell>
                  <TableHeaderCell textAlign="right">Amount</TableHeaderCell>
                  <TableHeaderCell textAlign="right">Created On</TableHeaderCell>
                </TableHeaderRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id} item={row}>
                    <TableCell><Text size="small" color="surface.text.gray.normal">{row.linkId}</Text></TableCell>
                    <TableCell><Badge color={statusColorMap[row.status]} size="medium">{row.status}</Badge></TableCell>
                    <TableCell><Text size="small" color="surface.text.gray.normal">{row.receiptNo}</Text></TableCell>
                    <TableCell><Text size="small" color="surface.text.gray.normal">{row.link}</Text></TableCell>
                    <TableCell textAlign="right"><Amount value={row.amount} type="body" size="medium" weight="semibold" suffix="none" /></TableCell>
                    <TableCell textAlign="right"><Text size="small" color="surface.text.gray.normal">{row.createdAt}</Text></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </>
          )}
        </Table>

        {/* ── Pagination footer — matches Figma: "Showing [10 ▾] of 12" | [‹] [›] ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px', backgroundColor: 'white', borderTop: '1px solid #e4e6e7' }}>
          {/* Left: Showing [10 ▾] of 12 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 12, color: '#606c75', fontFamily: 'inherit' }}>Showing</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 28, padding: '0 6px 0 8px', border: '1px solid #e7e7e7', borderRadius: 8, backgroundColor: 'white', cursor: 'pointer' }}>
              <span style={{ fontSize: 12, color: '#606c75', fontFamily: 'inherit' }}>10</span>
              <ChevronDownIcon size="xsmall" color="surface.icon.gray.muted" />
            </div>
            <span style={{ fontSize: 12, color: '#606c75', fontFamily: 'inherit' }}>of 12</span>
          </div>

          {/* Right: prev / next */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, border: '1px solid #e7e7e7', borderRadius: 8, backgroundColor: 'white', cursor: 'pointer' }}>
              <ChevronLeftIcon size="small" color="surface.icon.gray.muted" />
            </button>
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, border: '1px solid #e7e7e7', borderRadius: 8, backgroundColor: 'white', cursor: 'pointer' }}>
              <ChevronRightIcon size="small" color="surface.icon.gray.muted" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <CreatePaymentLinkModalV1 isOpen={v1Open} onDismiss={() => setV1Open(false)} />
      <PaymentMethodModal isOpen={merchantModalOpen} onDismiss={() => setMerchantModalOpen(false)} />
      <CustomerPreviewModal isOpen={customerModalOpen} onDismiss={() => setCustomerModalOpen(false)} />
    </Box>
  );
};
