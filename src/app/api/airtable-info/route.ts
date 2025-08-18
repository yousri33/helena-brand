import { NextRequest, NextResponse } from 'next/server'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID

// Define interface for Airtable table structure
interface AirtableTable {
  id: string;
  name: string;
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Airtable Info API called')
    
    if (!AIRTABLE_API_KEY) {
      console.error('AIRTABLE_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Just check if we can access the base metadata
    console.log('📤 Checking Airtable base info')
    
    // Send to Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    )
    
    console.log('📥 Airtable response status:', airtableResponse.status)

    if (!airtableResponse.ok) {
      const errorText = await airtableResponse.text()
      console.error('Airtable API error:', errorText)
      try {
        // Try to parse the error as JSON for more detailed error reporting
        const errorJson = JSON.parse(errorText)
        console.error('Airtable API error details:', errorJson)
        return NextResponse.json(
          { error: 'Failed to access Airtable base info', details: errorJson },
          { status: 500 }
        )
      } catch (parseError) {
        // If parsing fails, return the raw error text
        return NextResponse.json(
          { error: 'Failed to access Airtable base info', details: errorText },
          { status: 500 }
        )
      }
    }

    const data = await airtableResponse.json()
    console.log('📊 Airtable base info retrieved successfully')
    
    // Extract table IDs and names
    const tableIds = data.tables.map((table: AirtableTable) => ({
      id: table.id,
      name: table.name
    }))

    return NextResponse.json({ success: true, tables: tableIds })
  } catch (error) {
    console.error('Unexpected error in Airtable Info API:', error)
    return NextResponse.json(
      { error: 'Unexpected server error', details: String(error) },
      { status: 500 }
    )
  }
}
