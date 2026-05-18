import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Agentation } from 'agentation';
import '../sidenav-frame.css';
import {
  Box,
  TopNav,
  TopNavBrand,
  TopNavContent,
  TopNavActions,
  TabNav,
  TabNavItem,
  TabNavItems,
  SideNav,
  SideNavBody,
  SideNavSection,
  SideNavLink,
  SideNavFooter,
  SideNavItem,
  Avatar,
  SearchInput,
  Switch,
  Indicator,
  Badge,
  Button,
  // TopNav icons
  MenuIcon,
  AcceptPaymentsIcon,
  ZapIcon,
  BellIcon,
  SettingsIcon,
  // SideNav primary icons
  HomeIcon,
  TransactionsIcon,
  BankIcon,
  ReportsIcon,
  // Payment Products
  PaymentLinksIcon,
  PaymentPagesIcon,
  AtSignIcon,
  // Banking Products
  RazorpayxPayrollIcon,
  // Customer Products
  CustomersIcon,
  OffersIcon,
  CodeSnippetIcon,
  GridIcon,
} from '@razorpay/blade/components';

const AnchorLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>((props, ref) => <a ref={ref} {...props} />);
AnchorLink.displayName = 'AnchorLink';

// Razorpay wordmark SVG (white) — matches Figma logo asset
const RazorpayWordmark = () => (
  <svg
    width="97"
    height="20"
    viewBox="0 0 388 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Razorpay"
  >
    <path d="M0 0H44.8L29.9 56H74.7L29.9 112H0L14.9 56H0V0Z" fill="white" />
    <path
      d="M60.8 0H105.6L90.7 56H135.5L90.7 112H60.8L75.7 56H60.8V0Z"
      fill="rgba(255,255,255,0.45)"
    />
    <text
      x="125"
      y="72"
      fill="white"
      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      fontSize="72"
      fontWeight="700"
      letterSpacing="-1"
    >
      razorpay
    </text>
  </svg>
);

export const DashboardLayout = () => {
  const location = useLocation();
  const [isTestMode, setIsTestMode] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      overflow="hidden"
      // Background set on body via sidenav-frame.css (#202124 dark shell)
      backgroundColor="transparent"
    >
      {/* ── TopNav ── */}
      <TopNav position="sticky" top="spacing.0" zIndex={100}>
        {/* Mobile-only hamburger — hidden at l breakpoint (1024px+) */}
        <Box display={{ base: 'flex', l: 'none' }} alignItems="center" marginRight="spacing.3">
          <Button
            variant="tertiary"
            icon={MenuIcon}
            onClick={() => setIsMobileNavOpen(true)}
            accessibilityLabel="Open navigation menu"
          />
        </Box>

        <TopNavBrand>
          <RazorpayWordmark />
        </TopNavBrand>

        <TopNavContent>
          <TabNav
            items={[
              { title: 'Payments', href: '/payment-links', icon: AcceptPaymentsIcon },
              { title: 'Neobanking', href: '#' },
              { title: 'Payroll', href: '#' },
              { title: 'Partners', href: '#' },
              { title: '+ More', href: '#' },
            ]}
          >
            {({ items }) => (
              <TabNavItems>
                {items.map((item) => (
                  <TabNavItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                    icon={item.icon}
                    isActive={
                      item.href === '/payment-links' &&
                      location.pathname.startsWith('/payment-links')
                    }
                  />
                ))}
              </TabNavItems>
            )}
          </TabNav>
        </TopNavContent>

        <TopNavActions>
          {/* Search: hidden below xl (1280px) to prevent TopNav overflow */}
          <Box display={{ base: 'none', xl: 'block' }}>
            <SearchInput
              accessibilityLabel="Search payment products, settings and more"
              placeholder="Search payment products, settings, and more"
              name="global-search"
              size="medium"
            />
          </Box>
          <Box display="flex" alignItems="center" gap="spacing.4">
            <ZapIcon color="surface.icon.staticWhite.normal" size="medium" />
            <BellIcon color="surface.icon.staticWhite.normal" size="medium" />
            <Avatar name="Priya R" size="medium" />
          </Box>
        </TopNavActions>
      </TopNav>

      {/* ── SideNav ── */}
      {/* Desktop (l+, 1024px): fixed left panel. Mobile: slide-in drawer. */}
      <SideNav
        isOpen={isMobileNavOpen}
        onDismiss={() => setIsMobileNavOpen(false)}
      >
        <SideNavBody>
          {/* ── Primary nav ── */}
          <SideNavSection>
            <SideNavLink as={AnchorLink} icon={HomeIcon} title="Home" href="#home" />
            <SideNavLink
              as={AnchorLink}
              icon={TransactionsIcon}
              title="Transactions"
              href="#transactions"
            />
            <SideNavLink
              as={AnchorLink}
              icon={BankIcon}
              title="Settlements"
              href="#settlements"
              titleSuffix={
                <Badge color="information" size="small">
                  4
                </Badge>
              }
            />
            <SideNavLink
              as={AnchorLink}
              icon={ReportsIcon}
              title="Reports"
              href="#reports"
            />
          </SideNavSection>

          {/* ── Payment Products ── */}
          {/* maxVisibleItems=3 shows Payment Links, Payment Pages, Razorpay.me Link */}
          {/* then "+12 More" collapse — matching the Figma sidebar design              */}
          <SideNavSection title="Payment products" maxVisibleItems={3}>
            <SideNavLink
              as={Link}
              icon={PaymentLinksIcon}
              title="Payment Links"
              href="/payment-links"
              isActive={location.pathname.startsWith('/payment-links')}
            />
            <SideNavLink
              as={AnchorLink}
              icon={PaymentPagesIcon}
              title="Payment Pages"
              href="#payment-pages"
            />
            <SideNavLink
              as={AnchorLink}
              icon={AtSignIcon}
              title="Razorpay.me Link"
              href="#razorpay-me"
            />
            {/* These 12 items are hidden behind the "+12 More" toggle */}
            <SideNavLink as={AnchorLink} icon={AcceptPaymentsIcon} title="Payment Gateway" href="#payment-gateway" />
            <SideNavLink as={AnchorLink} icon={AcceptPaymentsIcon} title="Subscriptions" href="#subscriptions" />
            <SideNavLink as={AnchorLink} icon={AcceptPaymentsIcon} title="Invoices" href="#invoices" />
            <SideNavLink as={AnchorLink} icon={AcceptPaymentsIcon} title="Smart Collect" href="#smart-collect" />
            <SideNavLink as={AnchorLink} icon={AcceptPaymentsIcon} title="Payment Button" href="#payment-button" />
            <SideNavLink as={AnchorLink} icon={AcceptPaymentsIcon} title="Affordability" href="#affordability" />
            <SideNavLink as={AnchorLink} icon={AcceptPaymentsIcon} title="Optimizer" href="#optimizer" />
            <SideNavLink as={AnchorLink} icon={AcceptPaymentsIcon} title="Instant Settlement" href="#instant-settlement" />
            <SideNavLink as={AnchorLink} icon={AcceptPaymentsIcon} title="International Payments" href="#international" />
            <SideNavLink as={AnchorLink} icon={AcceptPaymentsIcon} title="UPI Autopay" href="#upi-autopay" />
            <SideNavLink as={AnchorLink} icon={AcceptPaymentsIcon} title="Magic Checkout" href="#magic-checkout" />
            <SideNavLink as={AnchorLink} icon={AcceptPaymentsIcon} title="POS" href="#pos" />
          </SideNavSection>

          {/* ── Banking Products ── */}
          <SideNavSection title="Banking products">
            <SideNavLink
              as={AnchorLink}
              icon={RazorpayxPayrollIcon}
              title="X Payroll"
              href="#x-payroll"
            />
            <SideNavLink
              as={AnchorLink}
              icon={RazorpayxPayrollIcon}
              title="X Banking"
              href="#x-banking"
            />
          </SideNavSection>

          {/* ── Customer Products ── */}
          <SideNavSection title="Customer products">
            <SideNavLink
              as={AnchorLink}
              icon={CustomersIcon}
              title="Customers"
              href="#customers"
            />
            <SideNavLink
              as={AnchorLink}
              icon={OffersIcon}
              title="Offers"
              href="#offers"
            />
            <SideNavLink
              as={AnchorLink}
              icon={CodeSnippetIcon}
              title="Developers"
              href="#developers"
            />
            <SideNavLink
              as={AnchorLink}
              icon={GridIcon}
              title="Apps & Deals"
              href="#apps-deals"
            />
          </SideNavSection>
        </SideNavBody>

        <SideNavFooter>
          <SideNavItem
            as="label"
            title="Test mode"
            leading={
              <Indicator
                color={isTestMode ? 'positive' : 'notice'}
                accessibilityLabel={isTestMode ? 'Test mode on' : 'Test mode off'}
              />
            }
            trailing={
              <Switch
                accessibilityLabel="Toggle test mode"
                size="small"
                isChecked={isTestMode}
                onChange={({ isChecked }) => setIsTestMode(isChecked)}
              />
            }
          />
          <SideNavLink
            as={AnchorLink}
            icon={SettingsIcon}
            title="Settings"
            href="#settings"
          />
        </SideNavFooter>
      </SideNav>

      {/* ── Main content ── */}
      {/*
        Desktop (l+):
          - marginLeft 264px (SideNav width) — sits flush with the SideNav right edge
          - marginTop/Right/Bottom spacing.2 (8px) — inset matches SideNav card gaps
          - White background so the panel matches the SideNav card surface
          - borderRadius on right corners to create the rounded inset panel look
        Mobile:
          - marginLeft 0 (full width), no extra inset margins
      */}
      {/*
        Outer shell: shifts the content column right of the SideNav.
        SideNav width: 240px at l (≥1024px), 264px at xl (≥1280px).
        Uses a plain div so we can attach the CSS class for the rounded-panel styling.
      */}
      <div className="main-content-panel">
        <Box
          paddingX={{ base: 'spacing.4', m: 'spacing.6' }}
          paddingBottom="spacing.10"
        >
          <Outlet />
        </Box>
      </div>

      {import.meta.env.DEV && <Agentation />}
    </Box>
  );
};
