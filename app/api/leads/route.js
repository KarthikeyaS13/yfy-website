import { NextResponse } from 'next/server';
import getDb from '../../../lib/db';

const FREE_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];

export async function POST(request) {
  try {
    const payload = await request.json();
    const {
      // Common Step 1
      id,
      lead_type,
      full_name,
      work_email,
      phone,
      company_name,
      persona,
      
      // Step 2 General
      consent,

      // Hidden Marketing Data
      utm_source,
      utm_medium,
      utm_campaign,
      referrer,
      landing_page,
      page_variant,

      // Exposure Report Fields
      job_title,
      industry,
      own_employees,
      contract_workers,
      num_contractors,
      states_operating,
      num_sites,
      monthly_contractor_spend,
      attendance_capture,
      challans_collected,
      current_approach,
      trigger,
      can_share_data,
      notes,

      // Compliance Proof Pack Fields
      service_type,
      deployed_workers,
      num_clients,
      client_profile,
      clients_audit_compliance,
      days_to_invoice,
      attendance_method,
      current_systems,
      biggest_pain
    } = payload;

    // VALIDATION
    if (!id) {
      // Step 1 Validation
      if (!full_name || !work_email) {
        return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
      }

      // Email Validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(work_email)) {
        return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
      }
      const domain = work_email.split('@')[1].toLowerCase();
      if (FREE_EMAIL_DOMAINS.includes(domain)) {
        return NextResponse.json({ error: 'Please use your work email address.' }, { status: 400 });
      }


    }

    // SCORING LOGIC (Applied only when Step 2 fields are present)
    let lead_score = 'NURTURE';
    if (id && lead_type === 'exposure_report') {
      const cw = parseInt(contract_workers || '0', 10);
      const states = parseInt(states_operating || '0', 10);
      
      if (cw >= 500 && states >= 3 && can_share_data === 'Yes') {
        lead_score = 'HOT';
      } else if (cw >= 100 && states >= 2) {
        lead_score = 'WARM';
      }
    } else if (id && lead_type === 'compliance_proof_pack') {
      const dw = parseInt(deployed_workers || '0', 10);
      const states = parseInt(states_operating || '0', 10);
      const audits = (clients_audit_compliance || '').toLowerCase();
      const profile = (client_profile || '').toLowerCase();
      
      const isAudited = audits.includes('regularly') || audits.includes('occasionally');
      const isTargetProfile = profile.includes('listed') || profile.includes('mnc');

      if (dw >= 1000 && states >= 3 && isAudited && isTargetProfile) {
        lead_score = 'HOT';
      } else if (dw >= 500 && states >= 2) {
        lead_score = 'WARM';
      }
    }

    const db = await getDb();

    if (!id) {
      // Insert Step 1
      const result = await db.run(`
        INSERT INTO conversion_leads (
          lead_type, full_name, work_email, phone, company_name, persona, 
          utm_source, utm_medium, utm_campaign, referrer, landing_page, page_variant
        )
        VALUES (
          :lead_type, :full_name, :work_email, :phone, :company_name, :persona,
          :utm_source, :utm_medium, :utm_campaign, :referrer, :landing_page, :page_variant
        )
      `, {
        ':lead_type': lead_type,
        ':full_name': full_name,
        ':work_email': work_email,
        ':phone': phone,
        ':company_name': company_name,
        ':persona': persona,
        ':utm_source': utm_source,
        ':utm_medium': utm_medium,
        ':utm_campaign': utm_campaign,
        ':referrer': referrer,
        ':landing_page': landing_page,
        ':page_variant': page_variant
      });

      return NextResponse.json({ success: true, id: result.lastID });
    } else {
      // Update Step 2
      await db.run(`
        UPDATE conversion_leads 
        SET 
          lead_score = :lead_score,
          consent = :consent,
          company_name = COALESCE(:company_name, company_name),
          phone = COALESCE(:phone, phone),
          
          job_title = COALESCE(:job_title, job_title),
          industry = COALESCE(:industry, industry),
          own_employees = COALESCE(:own_employees, own_employees),
          contract_workers = COALESCE(:contract_workers, contract_workers),
          num_contractors = COALESCE(:num_contractors, num_contractors),
          states_operating = COALESCE(:states_operating, states_operating),
          num_sites = COALESCE(:num_sites, num_sites),
          monthly_contractor_spend = COALESCE(:monthly_contractor_spend, monthly_contractor_spend),
          attendance_capture = COALESCE(:attendance_capture, attendance_capture),
          challans_collected = COALESCE(:challans_collected, challans_collected),
          current_approach = COALESCE(:current_approach, current_approach),
          trigger = COALESCE(:trigger, trigger),
          can_share_data = COALESCE(:can_share_data, can_share_data),
          notes = COALESCE(:notes, notes),
          
          service_type = COALESCE(:service_type, service_type),
          deployed_workers = COALESCE(:deployed_workers, deployed_workers),
          num_clients = COALESCE(:num_clients, num_clients),
          client_profile = COALESCE(:client_profile, client_profile),
          clients_audit_compliance = COALESCE(:clients_audit_compliance, clients_audit_compliance),
          days_to_invoice = COALESCE(:days_to_invoice, days_to_invoice),
          attendance_method = COALESCE(:attendance_method, attendance_method),
          current_systems = COALESCE(:current_systems, current_systems),
          biggest_pain = COALESCE(:biggest_pain, biggest_pain)
        WHERE id = :id
      `, {
        ':id': id,
        ':lead_score': lead_score,
        ':consent': consent,
        ':company_name': company_name,
        ':phone': phone,
        
        ':job_title': job_title,
        ':industry': industry,
        ':own_employees': own_employees,
        ':contract_workers': contract_workers,
        ':num_contractors': num_contractors,
        ':states_operating': states_operating,
        ':num_sites': num_sites,
        ':monthly_contractor_spend': monthly_contractor_spend,
        ':attendance_capture': attendance_capture,
        ':challans_collected': challans_collected,
        ':current_approach': current_approach,
        ':trigger': trigger,
        ':can_share_data': can_share_data,
        ':notes': notes,
        
        ':service_type': service_type,
        ':deployed_workers': deployed_workers,
        ':num_clients': num_clients,
        ':client_profile': client_profile,
        ':clients_audit_compliance': clients_audit_compliance,
        ':days_to_invoice': days_to_invoice,
        ':attendance_method': attendance_method,
        ':current_systems': current_systems,
        ':biggest_pain': biggest_pain
      });

      return NextResponse.json({ success: true, message: 'Thank you. Your request has been received. Our team will review the information and get back to you.' });
    }
  } catch (error) {
    console.error('Unexpected error in Leads API:', error);
    return NextResponse.json({ error: 'Unexpected error occurred.' }, { status: 500 });
  }
}
