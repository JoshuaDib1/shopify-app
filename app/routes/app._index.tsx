import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  Link,
  InlineStack,
  Badge,
  Icon,
  TextField,
  Tabs,
  MediaCard,
  VideoThumbnail,
  LegacyStack,
  ButtonGroup,
  SkeletonBodyText,
  Avatar,
  Scrollable,
  Thumbnail,
  LegacyCard,
  EmptyState,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "fetch_sections") {
    // Simulando datos de secciones
    return {
      trendingSections: [
        { 
          id: "1", 
          title: "Scrolling logo cloud", 
          price: "$9",
          thumbnail: "https://cdn.shopify.com/s/files/1/0646/9753/products/logo-cloud.png?v=1675386463", 
          category: "scrolling" 
        },
        { 
          id: "2", 
          title: "Product tabs", 
          price: "$9",
          thumbnail: "https://cdn.shopify.com/shopifycloud/shopify/assets/themes/product-tabs-ex-45140c7809d5233b21d09e6b2c6ff4eb9a26c5a8a41b9cad99423c2356346632.png", 
          category: "product" 
        },
        { 
          id: "3", 
          title: "Testimonial #8", 
          price: "$9",
          thumbnail: "https://cdn.shopify.com/s/files/1/0646/9753/products/testimonial-8.jpg?v=1675386463", 
          category: "testimonial" 
        },
        { 
          id: "4", 
          title: "Payment icons", 
          price: "$9",
          thumbnail: "https://cdn.shopify.com/s/files/1/0646/9753/products/payment-icons.png?v=1675386463", 
          category: "payment" 
        }
      ],
      newestSections: [
        { 
          id: "5", 
          title: "Testimonial Card", 
          price: "$9",
          thumbnail: "https://cdn.shopify.com/s/files/1/0646/9753/products/testimonial-card.png?v=1675386463", 
          category: "testimonial" 
        },
        { 
          id: "6", 
          title: "Product Benefits", 
          price: "$9",
          thumbnail: "https://cdn.shopify.com/s/files/1/0646/9753/products/benefits.png?v=1675386463", 
          category: "product" 
        },
        { 
          id: "7", 
          title: "Nutrition Facts", 
          price: "$9",
          thumbnail: "https://cdn.shopify.com/s/files/1/0646/9753/products/nutrition.png?v=1675386463", 
          category: "nutrition" 
        },
        { 
          id: "8", 
          title: "Ingredients List", 
          price: "$9",
          thumbnail: "https://cdn.shopify.com/s/files/1/0646/9753/products/ingredients.png?v=1675386463", 
          category: "nutrition" 
        }
      ]
    };
  }

  return null;
};

export default function Index() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const fetcher = useFetcher<any>();
  
  // Categorías de secciones con iconos representados como cadenas de texto
  const categories = [
    {
      id: "popular",
      label: "Popular",
      icon: <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a.75.75 0 0 1 .69.46l1.64 3.87 3.94.32a.75.75 0 0 1 .42 1.32l-3 2.48.89 3.83a.75.75 0 0 1-1.12.82L10 12.9l-3.46 2.2a.75.75 0 0 1-1.12-.82l.89-3.83-3-2.48a.75.75 0 0 1 .42-1.32l3.94-.32 1.64-3.87A.75.75 0 0 1 10 2Z" fill="currentColor"/></svg>
    },
    {
      id: "trending",
      label: "Trending",
      icon: <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 15c-2.486 0-4.5-1.35-4.5-3 0-1.486 1.435-2.648 3.44-2.932a.75.75 0 0 0 .06-1.496c-2.505.196-4.5 1.81-4.5 4.428 0 2.558 2.691 4.5 5.5 4.5s5.5-1.942 5.5-4.5c0-1.3-.604-2.42-1.654-3.197a.75.75 0 0 0-.893 1.205c.739.548 1.047 1.21 1.047 1.992 0 1.65-2.014 3-4.5 3Z" fill="currentColor"/><path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="currentColor"/></svg>
    },
    {
      id: "newest",
      label: "Newest",
      icon: <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="currentColor"/><path d="M10 10c2.941 0 5.25 1.167 6 2.5V14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.5c.75-1.333 3.059-2.5 6-2.5Z" fill="currentColor"/></svg>
    },
    {
      id: "free",
      label: "Free",
      icon: <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-1 11.25a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 1.5 0v4.5ZM9 7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" fill="currentColor"/></svg>
    },
    {
      id: "countdown",
      label: "Countdown timer",
      icon: <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Z" fill="currentColor"/><path d="M10.75 5.25a.75.75 0 0 0-1.5 0v4.69l-2.22 2.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 .219-.531l-.009-.053V5.25Z" fill="currentColor"/></svg>
    },
    {
      id: "features",
      label: "Features",
      icon: <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.75 9a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM6.75 13a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM13.25 13a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM13.25 9a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0-4.5Z" fill="currentColor"/></svg>
    },
    {
      id: "testimonial",
      label: "Testimonial",
      icon: <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 15.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM10 17a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" fill="currentColor"/><path d="M11.5 8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" fill="currentColor"/><path d="M7.583 9a2.917 2.917 0 0 0 2.917 2.917v.833c-2.037 0-3.75-1.712-3.75-3.75h.833Z" fill="currentColor"/></svg>
    },
    {
      id: "scrolling",
      label: "Scrolling",
      icon: <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M16.746 9.048c.47.54.47 1.364 0 1.904l-3.692 4.283c-.728.84-2.054.2-2.054-.983v-2.502H3.75a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 1 .75-.75H11v-2.503c0-1.184 1.326-1.823 2.054-.983l3.692 4.284Z" fill="currentColor"/></svg>
    },
    {
      id: "hero",
      label: "Hero",
      icon: <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 3.25a2.75 2.75 0 0 1 2.75-2.75h6.5a2.75 2.75 0 0 1 2.75 2.75v10.5a2.75 2.75 0 0 1-2.75 2.75h-6.5a2.75 2.75 0 0 1-2.75-2.75v-10.5Z" fill="currentColor"/><path d="M2 5.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM2 8.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM2.75 10a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5ZM2 13.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM11 11.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" fill="currentColor"/></svg>
    },
    {
      id: "video",
      label: "Video",
      icon: <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.322 7.918c1.073.751 1.073 2.413 0 3.164l-2.79 1.953a1.75 1.75 0 0 1-2.782-1.416v-4.238a1.75 1.75 0 0 1 2.782-1.416l2.79 1.953Z" fill="currentColor"/><path d="M3.75 2a1.75 1.75 0 0 0-1.75 1.75v12.5c0 .966.784 1.75 1.75 1.75h12.5a1.75 1.75 0 0 0 1.75-1.75v-12.5a1.75 1.75 0 0 0-1.75-1.75h-12.5Zm12.5 1.5a.25.25 0 0 1 .25.25v12.5a.25.25 0 0 1-.25.25h-12.5a.25.25 0 0 1-.25-.25v-12.5a.25.25 0 0 1 .25-.25h12.5Z" fill="currentColor"/></svg>
    },
    {
      id: "text",
      label: "Text",
      icon: <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4.5a1.5 1.5 0 0 1 1.5-1.5h7a1.5 1.5 0 0 1 1.5 1.5v1a.75.75 0 0 0 1.5 0v-1a3 3 0 0 0-3-3h-7a3 3 0 0 0-3 3v1a.75.75 0 0 0 1.5 0v-1ZM4.25 8.5a.75.75 0 0 0 0 1.5h11.5a.75.75 0 0 0 0-1.5h-11.5ZM4.25 12a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Z" fill="currentColor"/></svg>
    },
    {
      id: "images",
      label: "Images",
      icon: <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-2 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" fill="currentColor"/><path d="M14 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" fill="currentColor"/><path d="M1.75 10.75a.75.75 0 0 0-1.5 0v4.5a2.75 2.75 0 0 0 2.75 2.75h14a2.75 2.75 0 0 0 2.75-2.75v-4.5a.75.75 0 0 0-1.5 0v4.5c0 .69-.56 1.25-1.25 1.25h-14c-.69 0-1.25-.56-1.25-1.25v-4.5Z" fill="currentColor"/><path d="M9.167 11.3c-3.491-1.686-5.205.35-5.852 1.129 0 0-.657.779-1.315.518-.658-.26-.329-1.229-.329-1.229.877-2.082 3.375-2.193 5.166-1.978 1.792.214 2.451.862 2.451.862l.793-1.123s-4.536-2.715-8.056 0C.496 11.194.243 14.796.243 14.796s0 1.747 2.42.39c2.42-1.358 2.856-2.217 6.067-1.033 3.211 1.184 6.532-2.185 6.532-2.185l-1.008-.909c-.219.202-1.596 1.925-5.087.24Z" fill="currentColor"/></svg>
    },
    {
      id: "snippets",
      label: "Snippets",
      icon: <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M14.47 4.97a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 0 1-1.06-1.06l2.47-2.47-2.47-2.47a.75.75 0 0 1 0-1.06Z" fill="currentColor"/><path d="M5.53 4.97a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-2.47-2.47 2.47-2.47a.75.75 0 0 0 0-1.06Z" fill="currentColor"/><path d="M8.19 3.143a.75.75 0 0 1 .932-.514l3 .857a.75.75 0 1 1-.417 1.441l-3-.857a.75.75 0 0 1-.514-.927Z" fill="currentColor"/></svg>
    }
  ];

  useEffect(() => {
    // Cargar secciones
    fetcher.submit({ action: "fetch_sections" }, { method: "POST" });
  }, []);

  const isLoading = fetcher.state === "loading" || fetcher.state === "submitting";

  // Renderizar sección de categorías
  const renderCategories = () => {
    return (
      <Scrollable horizontal>
        <InlineStack gap="300" wrap={false}>
          {categories.map((category, index) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(index)}
              pressed={index === selectedCategory}
              icon={() => category.icon}
              variant="tertiary"
            >
              {category.label}
            </Button>
          ))}
        </InlineStack>
      </Scrollable>
    );
  };

  // Renderizar tarjeta de sección
  const renderSectionCard = (section: any) => {
    return (
      <Layout.Section variant="oneThird">
        <LegacyCard>
          <Box padding="400">
            <BlockStack gap="300">
              <div style={{ width: '100%', position: 'relative', aspectRatio: '16/10', overflow: 'hidden', borderRadius: '8px' }}>
                <img 
                  src={section.thumbnail} 
                  alt={section.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <InlineStack align="space-between">
                <Text as="h3" variant="headingSm">{section.title}</Text>
                <Text as="h3" variant="headingSm">{section.price}</Text>
              </InlineStack>
            </BlockStack>
          </Box>
        </LegacyCard>
      </Layout.Section>
    );
  };

  // Renderizar secciones populares
  const renderTrendingSections = () => {
    if (isLoading) {
      return (
        <Layout>
          {[...Array(4)].map((_, i) => (
            <Layout.Section variant="oneThird" key={`skeleton-${i}`}>
              <Card>
                <Box padding="400">
                  <BlockStack gap="400">
                    <div style={{ height: '150px' }}>
                      <SkeletonBodyText lines={1} />
                    </div>
                    <SkeletonBodyText lines={1} />
                  </BlockStack>
                </Box>
              </Card>
            </Layout.Section>
          ))}
        </Layout>
      );
    }

    const sections = fetcher.data?.trendingSections || [];
    if (sections.length === 0) {
      return (
        <EmptyState
          heading="No trending sections found"
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>Try checking back later for new trending sections</p>
        </EmptyState>
      );
    }

    return (
      <Layout>
        {sections.map((section: any) => renderSectionCard(section))}
      </Layout>
    );
  };

  // Renderizar nuevas secciones
  const renderNewestSections = () => {
    if (isLoading) {
      return (
        <Layout>
          {[...Array(4)].map((_, i) => (
            <Layout.Section variant="oneThird" key={`skeleton-new-${i}`}>
              <Card>
                <Box padding="400">
                  <BlockStack gap="400">
                    <div style={{ height: '150px' }}>
                      <SkeletonBodyText lines={1} />
                    </div>
                    <SkeletonBodyText lines={1} />
                  </BlockStack>
                </Box>
              </Card>
            </Layout.Section>
          ))}
        </Layout>
      );
    }

    const sections = fetcher.data?.newestSections || [];
    if (sections.length === 0) {
      return (
        <EmptyState
          heading="No new sections found"
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>Check back later for new section releases</p>
        </EmptyState>
      );
    }

    return (
      <Layout>
        {sections.map((section: any) => renderSectionCard(section))}
      </Layout>
    );
  };

  // Icono de búsqueda como SVG
  const searchIcon = (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm9.707 4.293-4.82-4.82A5.968 5.968 0 0 0 14 8 6 6 0 0 0 2 8a6 6 0 0 0 10.5 3.964l4.793 4.793a1 1 0 1 0 1.414-1.414Z" fill="currentColor"/>
    </svg>
  );

  return (
    <Page fullWidth>
      <TitleBar title="Section Store" />
      <BlockStack gap="600">
        <Card>
          <BlockStack gap="400">
            <TextField
              label=""
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Search for sections"
              prefix={<Icon source={() => searchIcon} />}
              clearButton
              onClearButtonClick={() => setSearchValue('')}
              autoComplete="off"
            />
            {renderCategories()}
          </BlockStack>
        </Card>

        <BlockStack gap="800">
          <BlockStack gap="400">
            <Text as="h2" variant="headingLg">Trending Now</Text>
            {renderTrendingSections()}
          </BlockStack>

          <BlockStack gap="400">
            <Text as="h2" variant="headingLg">Newest Releases</Text>
            {renderNewestSections()}
          </BlockStack>
        </BlockStack>
      </BlockStack>
    </Page>
  );
}
