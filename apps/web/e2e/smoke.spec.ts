import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('blog page loads successfully', async ({ page }) => {
    // Try /blog first, then fall back to /posts
    let blogUrl = '/blog';
    await page.goto(blogUrl);
    await page.waitForLoadState('networkidle');
    
    // If we get a 404 on /blog, try /posts
    const pageTitle = await page.title();
    if (pageTitle.toLowerCase().includes('404') || pageTitle.toLowerCase().includes('not found')) {
      blogUrl = '/posts';
      await page.goto(blogUrl);
      await page.waitForLoadState('networkidle');
    }
    
    // Check that the page title contains expected content (blog or posts)
    await expect(page).toHaveTitle(/(blog|posts)/i);
    
    // Check that the main heading is visible
    await expect(page.locator('h1').first()).toBeVisible();
    
    // Verify the page doesn't have any obvious error states
    await expect(page.locator('[data-testid="error"]')).not.toBeVisible();
    await expect(page.locator('text=404')).not.toBeVisible();
    await expect(page.locator('text=Error')).not.toBeVisible();
    
    // Check that the page has loaded content (not just a loading spinner)
    await expect(page.locator('main')).toBeVisible();
  });

  test('link navigation works correctly', async ({ page }) => {
    // Start on homepage
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Find and click navigation link to blog (check both /blog and /posts)
    let blogLink = page.locator('a[href*="/blog"]').first();
    let targetUrl = /\/blog/;
    
    if (!(await blogLink.isVisible())) {
      // Try /posts link instead
      blogLink = page.locator('a[href*="/posts"]').first();
      targetUrl = /\/posts/;
    }
    
    if (await blogLink.isVisible()) {
      await blogLink.click();
      
      // Wait for navigation to complete
      await page.waitForLoadState('networkidle');
      
      // Verify we're on the blog/posts page
      await expect(page).toHaveURL(targetUrl);
      await expect(page.locator('h1').first()).toBeVisible();
    } else {
      // If no blog/posts link found, test directory link instead
      const directoryLink = page.locator('a[href*="/directory"]').first();
      await expect(directoryLink).toBeVisible();
      await directoryLink.click();
      
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/directory/);
      await expect(page.locator('h1').first()).toBeVisible();
    }
    
    // Test navigation back to home
    const homeLink = page.locator('a[href="/"]').first();
    if (await homeLink.isVisible()) {
      await homeLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL('/');
    }
  });

  test('directory page loads successfully', async ({ page }) => {
    // Navigate to the directory page
    await page.goto('/directory');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check that the page title contains expected content
    await expect(page).toHaveTitle(/directory/i);
    
    // Check that the main heading is visible
    await expect(page.locator('h1').first()).toBeVisible();
    
    // Verify the page doesn't have error states
    await expect(page.locator('[data-testid="error"]')).not.toBeVisible();
    await expect(page.locator('text=404')).not.toBeVisible();
    
    // Check that the page has loaded content
    await expect(page.locator('main')).toBeVisible();
  });

  test('homepage navigation menu works', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Test navigation to different pages
    const navigationTests = [
      { href: '/blog', expectedUrl: /\/blog/, testName: 'blog navigation' },
      { href: '/posts', expectedUrl: /\/posts/, testName: 'posts navigation' },
      { href: '/directory', expectedUrl: /\/directory/, testName: 'directory navigation' }
    ];
    
    for (const navTest of navigationTests) {
      // Go back to homepage for each test
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Find and click the navigation link (use contains for more flexible matching)
      const navLink = page.locator(`a[href*="${navTest.href}"]`).first();
      
      if (await navLink.isVisible()) {
        await navLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verify navigation was successful
        await expect(page).toHaveURL(navTest.expectedUrl);
        await expect(page.locator('h1').first()).toBeVisible();
      }
    }
  });

  test('responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that the page is responsive
    await expect(page.locator('body')).toBeVisible();
    
    // Navigate to blog on mobile
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    
    // Verify blog page works on mobile
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });
});