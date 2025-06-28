import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent, BadgeSize, BadgeVariant } from './badge.component';

@Component({
  template: `<app-badge [variant]="variant" [size]="size" [class]="customClass">{{
    content()
  }}</app-badge>`,
  standalone: true,
  imports: [BadgeComponent],
})
class TestHostComponent {
  variant: BadgeVariant = 'default';
  size: BadgeSize = 'default';
  customClass = '';
  content = input('Test Badge');
}

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render with default props', () => {
      fixture.detectChanges();
      const element = fixture.nativeElement as HTMLElement;
      expect(element.querySelector('span')).toBeTruthy();
    });
  });

  describe('Variant Classes', () => {
    it('should apply default variant class by default', () => {
      hostFixture.detectChanges();
      const badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('badge-default');
    });

    it('should apply success variant class', () => {
      hostComponent.variant = 'success';
      hostFixture.detectChanges();
      const badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('badge-success');
    });

    it('should apply info variant class', () => {
      hostComponent.variant = 'info';
      hostFixture.detectChanges();
      const badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('badge-info');
    });

    it('should apply warning variant class', () => {
      hostComponent.variant = 'warning';
      hostFixture.detectChanges();
      const badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('badge-warning');
    });

    it('should apply destructive variant class', () => {
      hostComponent.variant = 'destructive';
      hostFixture.detectChanges();
      const badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('badge-destructive');
    });
  });

  describe('Size Classes', () => {
    it('should not apply size class for default size', () => {
      hostComponent.size = 'default';
      hostFixture.detectChanges();
      const badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).not.toContain('badge-sm');
      expect(badgeElement.className).not.toContain('badge-lg');
    });

    it('should apply small size class', () => {
      hostComponent.size = 'sm';
      hostFixture.detectChanges();
      const badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('badge-sm');
    });

    it('should apply large size class', () => {
      hostComponent.size = 'lg';
      hostFixture.detectChanges();
      const badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('badge-lg');
    });
  });

  describe('Base Classes', () => {
    it('should always include base badge class', () => {
      hostFixture.detectChanges();
      const badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('badge');
    });
  });

  describe('Custom Classes', () => {
    it('should apply custom classes', () => {
      hostComponent.customClass = 'custom-class another-class';
      hostFixture.detectChanges();
      const badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('custom-class');
      expect(badgeElement.className).toContain('another-class');
    });

    it('should merge custom classes with component classes', () => {
      hostComponent.variant = 'success';
      hostComponent.size = 'lg';
      hostComponent.customClass = 'custom-class';
      hostFixture.detectChanges();
      const badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('badge');
      expect(badgeElement.className).toContain('badge-success');
      expect(badgeElement.className).toContain('badge-lg');
      expect(badgeElement.className).toContain('custom-class');
    });
  });

  describe('Content Projection', () => {
    it('should project text content', () => {
      hostFixture.componentRef.setInput('content', 'Test Content');
      hostFixture.detectChanges();
      const spanElement = hostFixture.nativeElement.querySelector('app-badge span') as HTMLElement;
      expect(spanElement.textContent?.trim()).toBe('Test Content');
    });

    it('should project complex content', () => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.componentRef.setInput('content', 'Complex Content');
      hostFixture.detectChanges();
      const spanElement = hostFixture.nativeElement.querySelector('app-badge span') as HTMLElement;
      expect(spanElement.textContent?.trim()).toBe('Complex Content');
    });
  });

  describe('Signal Updates', () => {
    it('should update classes when variant changes', () => {
      hostComponent.variant = 'default';
      hostFixture.detectChanges();
      let badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('badge-default');

      hostComponent.variant = 'success';
      hostFixture.detectChanges();
      badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('badge-success');
      expect(badgeElement.className).not.toContain('badge-default');
    });

    it('should update classes when size changes', () => {
      hostComponent.size = 'default';
      hostFixture.detectChanges();
      let badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).not.toContain('badge-sm');

      hostComponent.size = 'sm';
      hostFixture.detectChanges();
      badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('badge-sm');
    });

    it('should update classes when custom class changes', () => {
      hostComponent.customClass = 'initial-class';
      hostFixture.detectChanges();
      let badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('initial-class');

      hostComponent.customClass = 'updated-class';
      hostFixture.detectChanges();
      badgeElement = hostFixture.nativeElement.querySelector('app-badge') as HTMLElement;
      expect(badgeElement.className).toContain('updated-class');
      expect(badgeElement.className).not.toContain('initial-class');
    });
  });

  describe('Component Methods', () => {
    it('should compute classes correctly with setInput', () => {
      fixture.componentRef.setInput('variant', 'success');
      fixture.componentRef.setInput('size', 'lg');
      fixture.componentRef.setInput('class', 'custom-class');
      fixture.detectChanges();

      const computedClasses = component.computedClasses();
      expect(computedClasses).toBe('badge badge-success badge-lg custom-class');
    });

    it('should handle empty custom class', () => {
      fixture.componentRef.setInput('variant', 'info');
      fixture.componentRef.setInput('size', 'default');
      fixture.componentRef.setInput('class', '');
      fixture.detectChanges();

      const computedClasses = component.computedClasses();
      expect(computedClasses).toBe('badge badge-info');
    });

    it('should trim whitespace from computed classes', () => {
      fixture.componentRef.setInput('variant', 'default');
      fixture.componentRef.setInput('size', 'default');
      fixture.componentRef.setInput('class', '  custom-class  ');
      fixture.detectChanges();

      const computedClasses = component.computedClasses();
      expect(computedClasses).toBe('badge badge-default custom-class');
    });
  });
});
