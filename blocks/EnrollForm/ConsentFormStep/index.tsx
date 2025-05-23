"use client"

import React, { useEffect, useState, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import StepHeader from "@/components/StepHeader";
import type { EnrollmentFormData } from "@/lib/form-types";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ConsentFormStep: React.FC = () => {
  const {
    control,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<EnrollmentFormData>();

  const firstName = watch("personalInfo.firstName");
  const lastName = watch("personalInfo.lastName");
  const clientDisplayName = (firstName && lastName) ? `${firstName} ${lastName}` : "[Client\'s Name]";

  const signatureValue = watch("documents.signature");
  const agreedToTermsValue = watch("documents.agreedToTerms");

  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (agreedToTermsValue) {
      trigger("documents.signature");
    }
  }, [signatureValue, agreedToTermsValue, trigger]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      // Check if user has scrolled to within 50px of the bottom
      if (scrollHeight - scrollTop - clientHeight < 50) {
        setHasScrolledToBottom(true);
      }
    }
  };

  return (
    <>
      <StepHeader
        title="Review Program Agreement"
        subtitle="Please read and sign the following document"
      />
      <div className="space-y-4 rounded-lg">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="h-60 overflow-y-auto p-3 rounded-lg border border-border bg-white mb-2 text-xs"
        >
          {/* General Standards for Educational Classes */}
          <h3 className="text-sm font-semibold mb-2">General Standards for Educational Classes</h3>
          <ol className="list-decimal list-inside space-y-1 mb-3 text-muted-foreground">
            <li>All individual and group sessions must be attended, and participants are to arrive on time. If you are late you will not be allowed to receive credit for that session. While in attendance clients will actively participate, be in a room alone with no other people present, and be viewable on camera at all times during class.</li>
            <li>A total of two (2) absences are allowed in substance abuse level one.</li>
            <li>There is a No-Tolerance policy in regard to violence, weapons, or re-offense; demonstration of each will result in immediate dismissal from the session and potentially the program.</li>
            <li>Participants agree to participate and pay for a minimum of 2 random Drug and Alcohol Screens.</li>
            <li>Use of any mood-altering drug (including alcohol) is prohibited throughout the duration of the assigned program with exception to those prescribed medication for a physical condition in which another, non-mood altering drug, cannot be substituted. Justification for this exception will require written consent to exchange information with the prescribing physician.</li>
            <li>Any participant that tests positive for drugs or alcohol will be immediately referred to Substance Abuse Treatment at the level deemed appropriate by Three Trees Staff.</li>
            <li>Participant must agree to sign required contracts, and to assist in developing personal treatment plan when appropriate.</li>
          </ol>

          {/* Group Confidentiality Agreement */}
          <h3 className="text-sm font-semibold mb-2">Group Confidentiality Agreement</h3>
          <ol className="list-decimal list-inside space-y-1 mb-3 text-muted-foreground">
            <li>I, <span className="font-semibold bg-yellow-300">{clientDisplayName}</span>, promise to hold confidential all communications made by participants and all information obtained from or about any participant while receiving treatment in this program.</li>
            <li>I am making this promise in consideration of the mutual promises made by all participants in this group and in return for benefits available from group therapy/education.</li>
            <li>I understand the purpose of this agreement is to help assure that each member of the group will feel more comfortable revealing personal information about themselves, enabling the therapists/facilitators to obtain as much information as possible necessary for effective treatment.</li>
            <li>Please sign this form and keep a copy for yourself for future reference. Should you have any questions at any time, please ask.</li>
          </ol>

          {/* Fee and Payment Policies */}
          <h3 className="text-sm font-semibold mb-2">Fee and Payment Policies</h3>
          <ol className="list-decimal list-inside space-y-1 mb-3 text-muted-foreground">
            <li>Three Trees only accepts secured payments; therefore, fees may be paid by cash or money order, or online at www.threetreescenterforchange.com.</li>
            <li>The cost of enrollment at the time of intake is $40.00 for all applicants to the program.</li>
            <li>The cost for each group session is $25.00 per class.</li>
            <li>You will have a minimum of 2 drug and alcohol screens that will cost $25 each. These will be paid at time of drug screen.</li>
            <li>Group fees are to be paid at the time service is provided. If unable to pay the entire group fee, the participant will not receive credit for that session. If a participant wishes to attend and participate in a group session without receiving credit, he/she is welcome to do so.</li>
            <li>Program clients are held responsible for any outstanding balances even after they are no longer participating in the program.</li>
          </ol>

          {/* Statement of Client Rights */}
          <h3 className="text-sm font-semibold mb-1">Statement of Client Rights</h3>
          <h3 className="text-xs mb-2 text-muted-foreground">As a client of Three Trees Center For Change, LLC, you will be afforded:</h3>
          <ol className="list-decimal list-inside space-y-1 mb-3 text-muted-foreground">
            <li>Respect and dignity for and protection of your privacy</li>
            <li>Your informed consent to participate in services</li>
            <li>CONFIDENTIALITY of your client records, unless contraindicated in treatment and recovery process or as ordered by an appropriate healthcare provider</li>
            <li>Privacy of sessions, unless contraindicated in treatment and recovery process or as ordered by an appropriate healthcare provider</li>
            <li>A thorough explanation of program treatment, rules, and expectations</li>
            <li>The opportunity to provide feedback and recommendations throughout treatment regarding program rules, expectations, and quality of care</li>
            <li>All rights and privileges regarding civil rights pursuant to Title VII, Section 601 of the Civil Rights Act of 1964, the Americans with Disabilities Act.</li>
          </ol>
          <p className="text-xs text-muted-foreground mb-3">I have reviewed and understand the general rules, fee and payment policies, confidentiality agreement and my rights.</p>

          {/* Authorization for Release of Information */}
          <h3 className="text-sm font-semibold mb-2">Authorization for Release of Information</h3>
          <p className="text-xs text-muted-foreground mb-1">I, <span className="font-semibold bg-yellow-300">{clientDisplayName}</span>, authorize Three Trees Center for Change, LLC to exchange the below specified information with anyone who is involved in the court mandated monitoring of my treatment. To include, but not limited to, the Department of Social Services, Probation and Parole, Victim Advocates, Pre-Trial Intervention, County Solicitor&apos;s Office, or Court employees, and my own legal counsel.</p>
          <p className="text-xs text-muted-foreground mb-1">I further authorize Three Trees Center for Change, LLC to exchange information with the following additional individuals/groups:</p>
          <ol className="list-decimal list-inside space-y-1 mb-1 text-muted-foreground">
            <li className="break-all">__________________________________</li>
            <li className="break-all">__________________________________</li>
            <li className="break-all">__________________________________</li>
            <li className="break-all">__________________________________</li>
          </ol>
          <p className="text-xs text-muted-foreground font-semibold my-1">The following information will be shared:</p>
          <ol className="list-decimal list-inside space-y-1 mb-1 text-muted-foreground">
            <li>Re-offenses of violence towards anyone</li>
            <li>Violations of court orders</li>
            <li>Missed appointments and compliance with other program rules</li>
            <li>Treatment progress</li>
            <li>Information relevant to safety, assessment and treatment planning</li>
          </ol>
          <p className="text-xs text-muted-foreground mb-1">This authorization will expire 180 days from my completion or termination of this program, except for allowing Three Trees Center for Change to follow up at 1, 3, and 5 year intervals to see if I have recidivated. I also understand that this authorization may be revoked by me, in writing, at any time, except to the extent that action has already been taken.</p>
          <p className="text-xs text-muted-foreground">I have reviewed and provide permission for my information to be released to the above-mentioned parties.</p>
        </div>

        {!hasScrolledToBottom && (
          <div className="text-center p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
            Please scroll through and read the entire agreement above to continue
          </div>
        )}

        <Controller
          name="documents.agreedToTerms"
          control={control}
          render={({ field }) => (
            <div className={`bg-white border rounded-lg p-4 shadow-sm ${!hasScrolledToBottom ? 'opacity-50' : ''}`}>
              <div 
                className="flex items-center hover:bg-muted/50 cursor-pointer" 
                onClick={() => hasScrolledToBottom && field.onChange(!field.value)}
              >
                <Checkbox
                  id="agreedToTerms"
                  checked={field.value}
                  onCheckedChange={field.onChange} // RHF handles state
                  className="mr-3"
                  disabled={!hasScrolledToBottom}
                />
                <Label 
                  htmlFor="agreedToTerms" 
                  className={`text-sm font-normal cursor-pointer ${!hasScrolledToBottom ? 'text-muted-foreground' : 'text-foreground'}`}
                >
                  I have read and agree to the Program Agreement.
                </Label>
              </div>
            </div>
          )}
        />
        {errors.documents?.agreedToTerms?.message && (
          <p className="text-xs text-red-500 -mt-2">{errors.documents.agreedToTerms.message as string}</p>
        )}

        {/* Electronic Signature - Typed Name Input */}
        <div className={`space-y-2 ${!hasScrolledToBottom ? 'opacity-50' : ''}`}>
          <Controller
            name="documents.signature" // Ensure this path is in your Zod schema if validation is needed
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Electronic Signature (Type your full name as: <span className="font-semibold">{clientDisplayName}</span>)
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Type your full name to sign"
                    {...field} 
                    className="bg-white"
                    disabled={!hasScrolledToBottom}
                  />
                </FormControl>
                <FormMessage /> {/* For displaying validation errors for the signature field */}
              </FormItem>
            )}
          />
          <Button
            variant="link"
            type="button" // Ensure it doesn't submit the form
            className="p-0 h-auto text-primary text-xs"
            onClick={() => hasScrolledToBottom && setValue("documents.signature", "", { shouldValidate: true, shouldDirty: true })} // Clear and validate
            disabled={!hasScrolledToBottom}
          >
            Clear signature
          </Button>
        </div>
        {/* The error message below Controller will now work if documents.signature has Zod validation */}
      </div>
    </>
  );
};

export default ConsentFormStep; 