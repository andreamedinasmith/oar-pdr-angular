import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, waitForAsync  } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { LandingBodyComponent } from './landingbody.component';
import { SectionsModule } from 'oarlps';

import { AppConfig } from 'oarlps';
import { NerdmRes, NerdmComp } from 'oarlps';
import { MetadataUpdateService } from 'oarlps';
import { UserMessageService } from 'oarlps';
import { AuthService, WebAuthService, MockAuthService } from 'oarlps';
import { GoogleAnalyticsService } from 'oarlps';
import { CartService } from 'oarlps';

import { config, testdata } from 'oarlps';
import { MetricsData } from "./metrics-data";

describe('LandingBodyComponent', () => {
    let component: LandingBodyComponent;
    let fixture: ComponentFixture<LandingBodyComponent>;
    let cfg : AppConfig = new AppConfig(config);
    let record1 : NerdmRes = testdata['test1'];
    let authsvc : AuthService = new MockAuthService()

    let makeComp = function() {
        TestBed.configureTestingModule({
            imports: [ HttpClientModule, SectionsModule, RouterTestingModule ],
            declarations: [ LandingBodyComponent ],
            providers: [
                { provide: AppConfig, useValue: cfg },
                { provide: AuthService, useValue: authsvc }, 
                GoogleAnalyticsService, UserMessageService, MetadataUpdateService, DatePipe,
                CartService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LandingBodyComponent);
        component = fixture.componentInstance;
    }

    beforeEach(waitForAsync(() => {
        makeComp();
        component.inBrowser = true;
        component.mobileMode = false;
        component.md = JSON.parse(JSON.stringify(record1));
        component.md["@type"][0] = "nrdp:PublicDataResource";
        component.metricsData = new MetricsData();
        component.editEnabled = false;
        fixture.detectChanges();
    }));

    it('should initialize', () => {
        expect(component).toBeTruthy();
        let cmpel = fixture.nativeElement;
        expect(cmpel.querySelector("#resourcebody")).toBeTruthy();

        let sect = cmpel.querySelector("#identity");
        expect(sect).toBeTruthy();
        let title = sect.querySelector("h2");
        expect(title).toBeTruthy();
        expect(title.textContent).toContain("MEDS-I")

        sect = cmpel.querySelector("#description")
        expect(sect).toBeTruthy();
        title = sect.querySelector("h3");
        expect(title).toBeTruthy();
        expect(title.textContent).toEqual("Description");

        sect = cmpel.querySelector("#dataAccess")
        expect(sect).toBeTruthy();
        title = sect.querySelector("h3");
        expect(title).toBeTruthy();
        expect(title.textContent).toEqual("Data Access");

        sect = cmpel.querySelector("#references")
        expect(sect).toBeTruthy();
        title = sect.querySelector("h3");
        expect(title).toBeTruthy();
        expect(title.textContent).toEqual("References");

        sect = cmpel.querySelector("#about")
        expect(sect).toBeTruthy();
        title = sect.querySelector("h3");
        console.log("title", title);
        expect(title).toBeTruthy();
        expect(title.textContent).toEqual("About This Dataset");

    });
});